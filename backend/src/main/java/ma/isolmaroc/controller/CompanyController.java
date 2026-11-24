package ma.isolmaroc.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;

@RestController
public class CompanyController {
    private final ObjectNode company;
    private final ObjectNode contact;
    private static final CacheControl CACHE = CacheControl.maxAge(Duration.ofMinutes(5)).cachePublic();

    public CompanyController(ObjectMapper mapper, @Value("${INSTAGRAM_URL:}") String instagram,
            @Value("${FACEBOOK_URL:}") String facebook) throws IOException {
        try (var stream = new ClassPathResource("company.json").getInputStream()) {
            company = mapper.readValue(stream, ObjectNode.class);
        }
        contact = (ObjectNode) company.required("contact");
        configureProfile("instagram", "instagram.com", instagram);
        configureProfile("facebook", "facebook.com", facebook);
    }

    private void configureProfile(String channel, String domain, String configured) {
        String value = configured.isBlank() ? contact.path(channel).asText("") : configured.strip();
        if (value.isBlank()) return;
        URI uri = URI.create(value);
        if (!"https".equalsIgnoreCase(uri.getScheme()) || uri.getUserInfo() != null ||
                !(domain.equalsIgnoreCase(uri.getHost()) || ("www." + domain).equalsIgnoreCase(uri.getHost())) ||
                uri.getPath() == null || uri.getPath().length() < 2) {
            throw new IllegalArgumentException("A company HTTPS profile URL is required for " + channel);
        }
        contact.put(channel, value);
    }

    @GetMapping("/api/company")
    public ResponseEntity<JsonNode> company() {
        return ResponseEntity.ok().cacheControl(CACHE).body(company);
    }

    @GetMapping("/api/contact")
    public ResponseEntity<JsonNode> contact() {
        return ResponseEntity.ok().cacheControl(CACHE).body(contact);
    }
}
