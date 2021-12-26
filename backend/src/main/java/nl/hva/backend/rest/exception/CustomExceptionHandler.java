package nl.hva.backend.rest.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@ControllerAdvice
class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ResourceNotFound.class)
    public final ResponseEntity<ExceptionResponse> handleNotFoundExceptions(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.NOT_FOUND.value(),
                "Resource not found",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(PreConditionFailed.class)
    public final ResponseEntity<ExceptionResponse> handlePreConditionFailedException(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.PRECONDITION_FAILED.value(),
                "PreCondition failed",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.PRECONDITION_FAILED);
    }
    @ExceptionHandler(SimulatorNotWorking.class)
    public final ResponseEntity<ExceptionResponse> handleSimulaorNotWorking(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                "Service is unavailable",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(AlreadyExist.class)
    public final ResponseEntity<ExceptionResponse> handleUserExist(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                403,
                "Duplicate user",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ExceptionResponse> handleBadRequest(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    //@ExceptionHandler(MethodArgumentNotValidException.class)
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest wr) {
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String field = ((FieldError)error).getField();
            String message = error.getDefaultMessage();
            errors.put(field, message);
        });

        ObjectMapper mapper = new ObjectMapper();
        String error = null;
        try {
            error = mapper.writeValueAsString(errors);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                status.value(),
                ex.getMessage(),
                error,
                path);

        return new ResponseEntity<>(exceptionResponse, headers, HttpStatus.BAD_REQUEST);
    }
}
