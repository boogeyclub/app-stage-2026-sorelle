package cm.odigital.serviceconnectmarket.auth.service;

import java.time.Clock;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import cm.odigital.serviceconnectmarket.auth.domain.UtilisateurStatus;
import cm.odigital.serviceconnectmarket.auth.persistence.AuthRepository;

@Service
public class RegistrationExpiryService {

    private final AuthRepository authRepository;
    private final Clock clock;

    public RegistrationExpiryService(AuthRepository authRepository, Clock authenticationClock) {
        this.authRepository = authRepository;
        this.clock = authenticationClock;
    }

    /**
     * Runs in its own transaction so expired pending accounts are removed even
     * when a subsequent registration or login request is denied.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void removeExpiredRegistrations() {
        authRepository.findExpiredPendingUtilisateurIds(
            clock.instant(),
            UtilisateurStatus.PENDING_CONFIRMATION.databaseValue()
        ).forEach(this::deletePendingRegistration);
    }

    private void deletePendingRegistration(long utilisateurId) {
        authRepository.deletePasswordHistory(utilisateurId);
        authRepository.deleteConfirmation(utilisateurId);
        authRepository.deletePendingUtilisateur(utilisateurId, UtilisateurStatus.PENDING_CONFIRMATION.databaseValue());
    }
}
