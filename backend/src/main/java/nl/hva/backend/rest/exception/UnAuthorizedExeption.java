package nl.hva.backend.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnAuthorizedExeption extends RuntimeException {
    public UnAuthorizedExeption(String message) {
        super(message);
    }
}
