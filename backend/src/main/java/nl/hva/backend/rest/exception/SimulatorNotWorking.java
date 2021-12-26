package nl.hva.backend.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class SimulatorNotWorking extends  RuntimeException{

    public SimulatorNotWorking(String message) {
        super(message);
    }
}
