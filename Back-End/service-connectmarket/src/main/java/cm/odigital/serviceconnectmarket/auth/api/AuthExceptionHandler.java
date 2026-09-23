package cm.odigital.serviceconnectmarket.auth.api;

import java.time.Clock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import cm.odigital.serviceconnectmarket.auth.api.dto.ApiErrorResponse;
import cm.odigital.serviceconnectmarket.auth.domain.AuthException;

@RestControllerAdvice
public class AuthExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthExceptionHandler.class);

    private final Clock clock;

    public AuthExceptionHandler(Clock authenticationClock) {
        this.clock = authenticationClock;
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthException(AuthException exception) {
        logRejection(exception.getStatus(), exception.getCode());
        return ResponseEntity.status(exception.getStatus())
            .body(error(exception.getCode(), exception.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getAllErrors().stream()
            .map(ObjectError::getDefaultMessage)
            .findFirst()
            .orElse("The request is not valid.");
        logRejection(HttpStatus.BAD_REQUEST, "REQUEST_VALIDATION_FAILED");
        return ResponseEntity.badRequest().body(error("REQUEST_VALIDATION_FAILED", message));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleUnreadableRequest(HttpMessageNotReadableException exception) {
        logRejection(HttpStatus.BAD_REQUEST, "REQUEST_BODY_INVALID");
        return ResponseEntity.badRequest().body(error("REQUEST_BODY_INVALID", "The request body is not valid."));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        logRejection(HttpStatus.CONFLICT, "REGISTRATION_IDENTITY_ALREADY_EXISTS");
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(error("REGISTRATION_IDENTITY_ALREADY_EXISTS", "An account already uses this email address or login."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpectedException(Exception exception) {
        LOGGER.error(
            "event=api.request.failed errorCode=UNEXPECTED_ERROR exceptionType={}",
            exception.getClass().getName()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error("UNEXPECTED_ERROR", "The request could not be completed."));
    }

    private void logRejection(HttpStatus status, String errorCode) {
        LOGGER.warn("event=api.request.rejected status={} errorCode={}", status.value(), errorCode);
    }

    private ApiErrorResponse error(String code, String message) {
        return new ApiErrorResponse(code, message, clock.instant());
    }
}
