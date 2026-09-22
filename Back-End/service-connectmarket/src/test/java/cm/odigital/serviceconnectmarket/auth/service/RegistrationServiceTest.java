package cm.odigital.serviceconnectmarket.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import cm.odigital.serviceconnectmarket.auth.config.RegistrationProperties;
import cm.odigital.serviceconnectmarket.auth.domain.AuthException;
import cm.odigital.serviceconnectmarket.auth.domain.ConfirmationTokenGenerator;
import cm.odigital.serviceconnectmarket.auth.domain.PendingRegistration;
import cm.odigital.serviceconnectmarket.auth.domain.RegistrationCommand;
import cm.odigital.serviceconnectmarket.auth.domain.UtilisateurStatus;
import cm.odigital.serviceconnectmarket.auth.messaging.RegistrationConfirmationMessage;
import cm.odigital.serviceconnectmarket.auth.messaging.RegistrationMessagingService;
import cm.odigital.serviceconnectmarket.auth.persistence.AuthRepository;
import cm.odigital.serviceconnectmarket.auth.persistence.ConfirmationRecord;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {

    private static final Instant NOW = Instant.parse("2026-09-22T12:00:00Z");

    @Mock
    private AuthRepository authRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ConfirmationTokenGenerator tokenGenerator;

    @Mock
    private RegistrationMessagingService messagingService;

    @Mock
    private RegistrationExpiryService registrationExpiryService;

    private RegistrationService registrationService;

    @BeforeEach
    void setUp() {
        RegistrationProperties properties = new RegistrationProperties();
        properties.setConfirmationUrl("https://api.example.test/api/auth/registration/confirm");
        registrationService = new RegistrationService(
            authRepository,
            passwordEncoder,
            tokenGenerator,
            messagingService,
            registrationExpiryService,
            properties,
            Clock.fixed(NOW, ZoneOffset.UTC)
        );
    }

    @Test
    void createsAPendingVendeurAndSendsAThreeHourConfirmationLink() {
        when(authRepository.identityExists("amina@example.com", "amina-cocoa")).thenReturn(false);
        when(authRepository.findUserTypeId("VENDEUR")).thenReturn(Optional.of(12L));
        when(authRepository.insertUtilisateur(
            eq(12L), eq("Ngono"), eq("Amina"), eq("amina@example.com"), eq("amina-cocoa"),
            eq(UtilisateurStatus.PENDING_CONFIRMATION.databaseValue()), eq(NOW)
        )).thenReturn(44L);
        when(passwordEncoder.encode("secure-passphrase")).thenReturn("bcrypt-password-hash");
        when(tokenGenerator.generate()).thenReturn("raw-confirmation-token");
        when(tokenGenerator.hash("raw-confirmation-token")).thenReturn("hashed-confirmation-token");

        PendingRegistration registration = registrationService.startRegistration(new RegistrationCommand(
            "VENDEUR",
            "Amina",
            "Ngono",
            "AMINA@example.com",
            "amina-cocoa",
            "secure-passphrase",
            "fr"
        ));

        assertEquals("amina@example.com", registration.email());
        assertEquals(NOW.plus(Duration.ofHours(3)), registration.expiresAt());
        verify(registrationExpiryService).removeExpiredRegistrations();
        verify(authRepository).insertPasswordHash(44L, "bcrypt-password-hash", NOW);
        verify(authRepository).insertConfirmation(44L, "hashed-confirmation-token", NOW.plus(Duration.ofHours(3)), NOW);

        ArgumentCaptor<RegistrationConfirmationMessage> message = ArgumentCaptor.forClass(RegistrationConfirmationMessage.class);
        verify(messagingService).sendConfirmation(message.capture());
        assertEquals("amina@example.com", message.getValue().recipientEmail());
        assertEquals(NOW.plus(Duration.ofHours(3)), message.getValue().expiresAt());
        assertEquals(
            "https://api.example.test/api/auth/registration/confirm?token=raw-confirmation-token",
            message.getValue().confirmationUrl()
        );
    }

    @Test
    void activatesThePendingUtilisateurWhenTheConfirmationLinkIsStillValid() {
        when(tokenGenerator.hash("valid-token")).thenReturn("valid-token-hash");
        when(authRepository.findConfirmationByTokenHash("valid-token-hash")).thenReturn(Optional.of(
            new ConfirmationRecord(
                44L,
                NOW.plus(Duration.ofHours(3)),
                null,
                UtilisateurStatus.PENDING_CONFIRMATION.databaseValue()
            )
        ));

        registrationService.confirmRegistration("valid-token");

        verify(authRepository).activateUtilisateur(
            44L,
            UtilisateurStatus.PENDING_CONFIRMATION.databaseValue(),
            UtilisateurStatus.ACTIVE.databaseValue()
        );
        verify(authRepository).markConfirmationCompleted(44L, NOW);
    }

    @Test
    void removesThePendingUtilisateurWhenTheConfirmationLinkHasExpired() {
        when(tokenGenerator.hash("expired-token")).thenReturn("expired-token-hash");
        when(authRepository.findConfirmationByTokenHash("expired-token-hash")).thenReturn(Optional.of(
            new ConfirmationRecord(
                44L,
                NOW.minusSeconds(1),
                null,
                UtilisateurStatus.PENDING_CONFIRMATION.databaseValue()
            )
        ));

        AuthException exception = assertThrows(AuthException.class, () -> registrationService.confirmRegistration("expired-token"));

        assertEquals("REGISTRATION_CONFIRMATION_EXPIRED", exception.getCode());
        verify(authRepository).deletePasswordHistory(44L);
        verify(authRepository).deleteConfirmation(44L);
        verify(authRepository).deletePendingUtilisateur(44L, UtilisateurStatus.PENDING_CONFIRMATION.databaseValue());
    }
}
