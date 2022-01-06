package nl.hva.backend.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class WrongPassword extends RuntimeException {
    public WrongPassword(String message) {
        super(message);
    }
}
