package ma.isolmaroc.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@RestController
public class CompanyController {
    private final JsonNode company;
    public CompanyController(ObjectMapper mapper) throws IOException {
        try (var stream = new ClassPathResource("company.json").getInputStream()) {
            company = mapper.readTree(stream);
        }
    }
    @GetMapping("/api/company") public JsonNode company() { return company; }
    @GetMapping("/api/contact") public JsonNode contact() { return company.get("contact"); }
}
