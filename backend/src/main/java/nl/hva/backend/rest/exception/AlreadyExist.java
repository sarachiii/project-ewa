package nl.hva.backend.rest.exception;


/**
 * Doel:
 *
 * @author Mohamad Hassan
 */

public class AlreadyExist extends RuntimeException{

    public AlreadyExist(String message) {
        super(message);
    }
}
