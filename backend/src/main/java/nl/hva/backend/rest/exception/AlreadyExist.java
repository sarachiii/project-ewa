package nl.hva.backend.rest.exception;


/**
 * @author Mohamad Hassan
 */

public class AlreadyExist extends RuntimeException{

    public AlreadyExist(String message) {
        super(message);
    }
}
