package nl.hva.backend.rest.exception;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
