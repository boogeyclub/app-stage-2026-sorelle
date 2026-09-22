package cm.odigital.serviceconnectmarket.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cm.odigital.serviceconnectmarket.auth.domain.AuthException;
import cm.odigital.serviceconnectmarket.auth.domain.AuthenticatedUtilisateur;
import cm.odigital.serviceconnectmarket.auth.domain.UtilisateurStatus;
import cm.odigital.serviceconnectmarket.auth.persistence.AuthRepository;
import cm.odigital.serviceconnectmarket.auth.persistence.LoginCandidate;

@Service
public class AuthenticationService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final RegistrationExpiryService registrationExpiryService;

    public AuthenticationService(
        AuthRepository authRepository,
        PasswordEncoder passwordEncoder,
        RegistrationExpiryService registrationExpiryService
    ) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.registrationExpiryService = registrationExpiryService;
    }

    public AuthenticatedUtilisateur authenticate(String identity, String password) {
        registrationExpiryService.removeExpiredRegistrations();

        LoginCandidate candidate = authRepository.findLoginCandidate(identity == null ? "" : identity.trim())
            .orElseThrow(() -> invalidCredentials());

        if (!passwordEncoder.matches(password == null ? "" : password, candidate.passwordHash())) {
            throw invalidCredentials();
        }

        if (UtilisateurStatus.PENDING_CONFIRMATION.databaseValue().equals(candidate.statut())) {
            throw AuthException.forbidden(
                "REGISTRATION_PENDING_CONFIRMATION",
                "Confirm the registration email before signing in."
            );
        }

        if (!UtilisateurStatus.ACTIVE.databaseValue().equals(candidate.statut())) {
            throw invalidCredentials();
        }

        return new AuthenticatedUtilisateur(
            candidate.id(),
            candidate.email(),
            candidate.login(),
            candidate.prenom(),
            candidate.nom(),
            candidate.userType()
        );
    }

    private AuthException invalidCredentials() {
        return AuthException.unauthorized("INVALID_CREDENTIALS", "The credentials are invalid.");
    }
}
