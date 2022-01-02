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
import org.springframework.web.reactive.function.UnsupportedMediaTypeException;
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
    public final ResponseEntity<ExceptionResponse> handleNotFound(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.NOT_FOUND.value(),
                "Resource Not Found",
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PreConditionFailed.class)
    public final ResponseEntity<ExceptionResponse> handlePreConditionFailed(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.PRECONDITION_FAILED.value(),
                HttpStatus.PRECONDITION_FAILED.getReasonPhrase(),
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
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConflictException.class)
    public final ResponseEntity<ExceptionResponse> handleConflict(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnsupportedMediaTypeException.class)
    public final ResponseEntity<ExceptionResponse> handleUnsupportedMediaType(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(),
                HttpStatus.UNSUPPORTED_MEDIA_TYPE.getReasonPhrase(),
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public final ResponseEntity<ExceptionResponse> handleInternalServerError(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadGatewayException.class)
    public final ResponseEntity<ExceptionResponse> handleBadGateway(Exception ex, WebRequest wr){
        String path = ((ServletWebRequest)wr).getRequest().getRequestURI();

        ExceptionResponse exceptionResponse = new ExceptionResponse(
                HttpStatus.BAD_GATEWAY.value(),
                HttpStatus.BAD_GATEWAY.getReasonPhrase(),
                ex.getMessage(),
                path);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_GATEWAY);
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
