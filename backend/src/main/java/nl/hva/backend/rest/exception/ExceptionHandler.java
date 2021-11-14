package nl.hva.backend.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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
                "PreCondition Failed",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.PRECONDITION_FAILED);
    }
}