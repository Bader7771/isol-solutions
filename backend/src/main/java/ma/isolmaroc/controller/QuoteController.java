package ma.isolmaroc.controller;

import ma.isolmaroc.dto.Quote;
import ma.isolmaroc.service.Quotes;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
public record QuoteController(Quotes quotes) {
    @GetMapping("/health") public Map<String,String> health() {
        return Map.of("status","ok","timestamp",LocalDateTime.now().toString());
    }
    @PostMapping({"/submit-devis","/api/devis"}) public Map<String,Object> submit(@Valid @RequestBody Quote quote) throws SQLException {
        quotes.submit(quote);
        return Map.of("success",true,"message","Votre demande de devis a été envoyée avec succès.");
    }
}
