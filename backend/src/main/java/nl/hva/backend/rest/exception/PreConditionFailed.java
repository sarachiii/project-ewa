package nl.hva.backend.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Mohamad Hassan
 */
@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
public class PreConditionFailed extends RuntimeException {
    public PreConditionFailed(String message) {
        super(message);
    }
}
