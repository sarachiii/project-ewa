package nl.hva.backend.rest.exception;


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
