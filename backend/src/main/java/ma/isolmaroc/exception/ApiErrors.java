package ma.isolmaroc.exception;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.server.ResponseStatusException;
import java.sql.SQLException;
import java.util.Map;

@RestControllerAdvice
public class ApiErrors {
    private ResponseEntity<?> error(HttpStatusCode status, String msg) {
        return ResponseEntity.status(status).body(Map.of("success",false,"message",msg));
    }
    @ExceptionHandler({MethodArgumentNotValidException.class,HttpMessageNotReadableException.class})
    ResponseEntity<?> invalid() { return error(HttpStatus.BAD_REQUEST,"Données invalides."); }
    @ExceptionHandler(ResponseStatusException.class)
    ResponseEntity<?> status(ResponseStatusException ex) { return error(ex.getStatusCode(),ex.getReason()); }
    @ExceptionHandler(SQLException.class)
    ResponseEntity<?> database() { return error(HttpStatus.INTERNAL_SERVER_ERROR,"Erreur serveur. Veuillez réessayer."); }
}
