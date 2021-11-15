package nl.hva.backend.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */

public class alreadyExist extends RuntimeException{

    public alreadyExist(String message) {
        super(message);
    }
}
