package cm.odigital.serviceconnectmarket.auth.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cm.odigital.serviceconnectmarket.auth.api.dto.AuthenticatedUserResponse;
import cm.odigital.serviceconnectmarket.auth.api.dto.ConfirmationResponse;
import cm.odigital.serviceconnectmarket.auth.api.dto.LoginRequest;
import cm.odigital.serviceconnectmarket.auth.api.dto.RegistrationAcceptedResponse;
import cm.odigital.serviceconnectmarket.auth.api.dto.RegistrationRequest;
import cm.odigital.serviceconnectmarket.auth.domain.AuthenticatedUtilisateur;
import cm.odigital.serviceconnectmarket.auth.domain.PendingRegistration;
import cm.odigital.serviceconnectmarket.auth.domain.RegistrationCommand;
import cm.odigital.serviceconnectmarket.auth.service.AuthenticationService;
import cm.odigital.serviceconnectmarket.auth.service.RegistrationService;
import cm.odigital.serviceconnectmarket.observability.AuditValue;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    public static final String SESSION_USER_ID = "cacaomarket.auth.user-id";
    public static final String SESSION_USER_ROLE = "cacaomarket.auth.user-role";

    private final RegistrationService registrationService;
    private final AuthenticationService authenticationService;

    public AuthController(RegistrationService registrationService, AuthenticationService authenticationService) {
        this.registrationService = registrationService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/registration")
    public ResponseEntity<RegistrationAcceptedResponse> register(@Valid @RequestBody RegistrationRequest request) {
        LOGGER.info(
            "event=registration.request.accepted role={} email={} login={}",
            request.role(),
            AuditValue.maskedEmail(request.email()),
            AuditValue.maskedIdentity(request.login())
        );
        PendingRegistration registration = registrationService.startRegistration(new RegistrationCommand(
            request.role(),
            request.prenom(),
            request.nom(),
            request.email(),
            request.login(),
            request.password(),
            request.language()
        ));

        LOGGER.info(
            "event=registration.request.completed email={} expiresAt={}",
            AuditValue.maskedEmail(registration.email()),
            registration.expiresAt()
        );
        return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(new RegistrationAcceptedResponse(registration.email(), registration.expiresAt()));
    }

    @GetMapping("/registration/confirm")
    public ConfirmationResponse confirmRegistration(@RequestParam String token) {
        LOGGER.info("event=registration.confirmation.request.accepted");
        registrationService.confirmRegistration(token);
        LOGGER.info("event=registration.confirmation.request.completed");
        return new ConfirmationResponse(
            "CONFIRMED",
            "Your CacaoMarket registration is confirmed. You can now sign in."
        );
    }

    @PostMapping("/login")
    public AuthenticatedUserResponse login(
        @Valid @RequestBody LoginRequest request,
        HttpServletRequest servletRequest
    ) {
        LOGGER.info("event=login.request.accepted identity={}", AuditValue.maskedIdentity(request.identity()));
        AuthenticatedUtilisateur utilisateur = authenticationService.authenticate(request.identity(), request.password());
        establishSession(servletRequest, utilisateur, Boolean.TRUE.equals(request.rememberMe()));

        LOGGER.info(
            "event=login.request.completed utilisateurId={} role={} rememberMe={}",
            utilisateur.id(),
            utilisateur.role(),
            Boolean.TRUE.equals(request.rememberMe())
        );
        return new AuthenticatedUserResponse(
            utilisateur.id(),
            utilisateur.email(),
            utilisateur.login(),
            utilisateur.prenom(),
            utilisateur.nom(),
            utilisateur.role()
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest servletRequest) {
        HttpSession session = servletRequest.getSession(false);
        boolean activeSessionFound = session != null;
        if (activeSessionFound) {
            session.invalidate();
        }
        LOGGER.info("event=logout.request.completed activeSessionFound={}", activeSessionFound);
        return ResponseEntity.noContent().build();
    }

    private void establishSession(HttpServletRequest request, AuthenticatedUtilisateur utilisateur, boolean rememberMe) {
        if (request.getSession(false) != null) {
            request.changeSessionId();
        }

        HttpSession session = request.getSession(true);
        session.setMaxInactiveInterval(rememberMe ? 60 * 60 * 24 * 7 : 60 * 30);
        session.setAttribute(SESSION_USER_ID, utilisateur.id());
        session.setAttribute(SESSION_USER_ROLE, utilisateur.role());
    }
}
