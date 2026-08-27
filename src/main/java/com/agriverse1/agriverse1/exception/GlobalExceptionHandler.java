package com.agriverse1.agriverse1.exception;

import com.agriverse1.agriverse1.dto.ApiResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Centralised error handling for all REST controllers.
 * Returns consistent JSON error responses instead of raw Spring error pages.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 400 Bad Request — triggered by @Valid failures on @RequestBody.
     * Returns a map of { fieldName: "error message" }.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }


    /**
     * 401 Unauthorized — wrong email or password during login.
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse("Invalid email or password."));
    }


    /**
     * 401 Unauthorized — Spring Security wraps UsernameNotFoundException inside
     * InternalAuthenticationServiceException when user is not found during authentication.
     * Without this handler it would fall through to the generic 500 handler.
     */
    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ApiResponse> handleInternalAuth(InternalAuthenticationServiceException ex) {
        Throwable cause = ex.getCause();
        if (cause instanceof UsernameNotFoundException) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Invalid email or password."));
        }
        log.error("[AUTH ERROR] {}: {}", ex.getClass().getName(), ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse("Authentication failed. Please try again."));
    }


    /**
     * 403 Forbidden — account is locked or disabled.
     */
    @ExceptionHandler({LockedException.class, DisabledException.class})
    public ResponseEntity<ApiResponse> handleAccountLocked(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ApiResponse("Your account has been suspended. Contact support."));
    }


    /**
     * 404 Not Found — user looked up by email does not exist.
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse> handleUserNotFound(UsernameNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse("Invalid email or password."));
    }


    /**
     * 409 Conflict — duplicate email on registration.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse> handleDuplicateEmail(DataIntegrityViolationException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiResponse(ex.getMessage()));
    }


    /**
     * 500 Internal Server Error — catch-all for unexpected exceptions.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGenericException(Exception ex) {
        log.error("[UNHANDLED EXCEPTION] {} : {}", ex.getClass().getName(), ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("An unexpected error occurred. Please try again later."));
    }
}
