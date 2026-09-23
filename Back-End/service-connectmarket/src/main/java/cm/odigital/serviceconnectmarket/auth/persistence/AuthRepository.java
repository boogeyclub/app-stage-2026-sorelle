package cm.odigital.serviceconnectmarket.auth.persistence;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AuthRepository {

    private final JdbcTemplate jdbcTemplate;

    public AuthRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<Long> findUserTypeId(String code) {
        List<Long> ids = jdbcTemplate.query(
            "SELECT id FROM gu.type_utilisateur WHERE code = ?",
            (resultSet, rowNumber) -> resultSet.getLong("id"),
            code
        );
        return ids.stream().findFirst();
    }

    public boolean identityExists(String email, String login) {
        Boolean exists = jdbcTemplate.queryForObject(
            """
                SELECT EXISTS (
                    SELECT 1
                    FROM gu.utilisateurs
                    WHERE LOWER(email) = LOWER(?) OR LOWER(login) = LOWER(?)
                )
                """,
            Boolean.class,
            email,
            login
        );
        return Boolean.TRUE.equals(exists);
    }

    public long insertUtilisateur(
        long typeUtilisateurId,
        String nom,
        String prenom,
        String email,
        String login,
        String statut,
        Instant createdAt
    ) {
        Long utilisateurId = jdbcTemplate.queryForObject(
            """
                INSERT INTO gu.utilisateurs
                    (type_utilisateur_id, nom, prenom, email, login, statut, "dateCreation")
                VALUES (?, ?, ?, ?, ?, ?, ?)
                RETURNING id
                """,
            Long.class,
            typeUtilisateurId,
            nom,
            prenom,
            email,
            login,
            statut,
            Timestamp.from(createdAt)
        );
        if (utilisateurId == null) {
            throw new IllegalStateException("The database did not return an utilisateur identifier.");
        }
        return utilisateurId;
    }

    public void insertPasswordHash(long utilisateurId, String passwordHash, Instant insertedAt) {
        jdbcTemplate.update(
            """
                INSERT INTO gu.password_history (utilisateur_id, "password", "current", date_insertion)
                VALUES (?, ?, TRUE, ?)
                """,
            utilisateurId,
            passwordHash,
            Timestamp.from(insertedAt)
        );
    }

    public void insertConfirmation(long utilisateurId, String tokenHash, Instant expiresAt, Instant createdAt) {
        jdbcTemplate.update(
            """
                INSERT INTO gu.registration_confirmation
                    (utilisateur_id, token_hash, expires_at, date_creation)
                VALUES (?, ?, ?, ?)
                """,
            utilisateurId,
            tokenHash,
            Timestamp.from(expiresAt),
            Timestamp.from(createdAt)
        );
    }

    public Optional<ConfirmationRecord> findConfirmationByTokenHash(String tokenHash) {
        List<ConfirmationRecord> confirmations = jdbcTemplate.query(
            """
                SELECT rc.utilisateur_id, rc.expires_at, rc.confirmed_at, u.statut
                FROM gu.registration_confirmation rc
                INNER JOIN gu.utilisateurs u ON u.id = rc.utilisateur_id
                WHERE rc.token_hash = ?
                FOR UPDATE OF rc, u
                """,
            (resultSet, rowNumber) -> {
                Timestamp confirmedAt = resultSet.getTimestamp("confirmed_at");
                return new ConfirmationRecord(
                    resultSet.getLong("utilisateur_id"),
                    resultSet.getTimestamp("expires_at").toInstant(),
                    confirmedAt == null ? null : confirmedAt.toInstant(),
                    resultSet.getString("statut")
                );
            },
            tokenHash
        );
        return confirmations.stream().findFirst();
    }

    public void activateUtilisateur(long utilisateurId, String pendingStatus, String activeStatus) {
        int updated = jdbcTemplate.update(
            """
                UPDATE gu.utilisateurs
                SET statut = ?
                WHERE id = ? AND statut = ?
                """,
            activeStatus,
            utilisateurId,
            pendingStatus
        );
        if (updated != 1) {
            throw new IllegalStateException("The pending utilisateur could not be activated.");
        }
    }

    public void markConfirmationCompleted(long utilisateurId, Instant confirmedAt) {
        int updated = jdbcTemplate.update(
            """
                UPDATE gu.registration_confirmation
                SET confirmed_at = ?
                WHERE utilisateur_id = ? AND confirmed_at IS NULL
                """,
            Timestamp.from(confirmedAt),
            utilisateurId
        );
        if (updated != 1) {
            throw new IllegalStateException("The registration confirmation could not be completed.");
        }
    }

    public List<Long> findExpiredPendingUtilisateurIds(Instant now, String pendingStatus) {
        return jdbcTemplate.query(
            """
                SELECT rc.utilisateur_id
                FROM gu.registration_confirmation rc
                INNER JOIN gu.utilisateurs u ON u.id = rc.utilisateur_id
                WHERE rc.confirmed_at IS NULL
                  AND rc.expires_at <= ?
                  AND u.statut = ?
                FOR UPDATE OF rc, u
                """,
            (resultSet, rowNumber) -> resultSet.getLong("utilisateur_id"),
            Timestamp.from(now),
            pendingStatus
        );
    }

    public void deletePasswordHistory(long utilisateurId) {
        jdbcTemplate.update("DELETE FROM gu.password_history WHERE utilisateur_id = ?", utilisateurId);
    }

    public void deleteConfirmation(long utilisateurId) {
        jdbcTemplate.update("DELETE FROM gu.registration_confirmation WHERE utilisateur_id = ?", utilisateurId);
    }

    public void deletePendingUtilisateur(long utilisateurId, String pendingStatus) {
        jdbcTemplate.update(
            "DELETE FROM gu.utilisateurs WHERE id = ? AND statut = ?",
            utilisateurId,
            pendingStatus
        );
    }

    public Optional<LoginCandidate> findLoginCandidate(String identity) {
        List<LoginCandidate> candidates = jdbcTemplate.query(
            """
                SELECT
                    u.id,
                    u.email,
                    u.login,
                    u.prenom,
                    u.nom,
                    u.statut,
                    tu.code AS type_code,
                    ph."password" AS password_hash
                FROM gu.utilisateurs u
                INNER JOIN gu.type_utilisateur tu ON tu.id = u.type_utilisateur_id
                INNER JOIN gu.password_history ph
                    ON ph.utilisateur_id = u.id AND ph."current" = TRUE
                WHERE (LOWER(u.email) = LOWER(?) OR LOWER(u.login) = LOWER(?))
                  AND tu.code IN ('VENDEUR', 'CLIENT', 'ADMINISTRATEUR')
                  AND EXISTS (
                      SELECT 1
                      FROM gu.type_utilisateur_basic_right tubr
                      INNER JOIN gu.basic_rights br ON br.id = tubr.basic_right_id
                      WHERE tubr.type_utilisateur_id = tu.id
                        AND br.code = 'APP-CONN'
                  )
                LIMIT 1
                """,
            (resultSet, rowNumber) -> new LoginCandidate(
                resultSet.getLong("id"),
                resultSet.getString("email"),
                resultSet.getString("login"),
                resultSet.getString("prenom"),
                resultSet.getString("nom"),
                resultSet.getString("type_code"),
                resultSet.getString("statut"),
                resultSet.getString("password_hash")
            ),
            identity,
            identity
        );
        return candidates.stream().findFirst();
    }
}
