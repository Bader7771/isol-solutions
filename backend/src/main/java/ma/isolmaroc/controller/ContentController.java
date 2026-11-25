package ma.isolmaroc.controller;

import com.fasterxml.jackson.databind.JsonNode;
import ma.isolmaroc.service.SiteContent;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api")
public class ContentController {
    private final SiteContent content;
    private static final CacheControl CACHE = CacheControl.maxAge(Duration.ofMinutes(5)).cachePublic();
    public ContentController(SiteContent content) { this.content = content; }

    @GetMapping("/content")
    public ResponseEntity<JsonNode> content() {
        return ResponseEntity.ok().cacheControl(CACHE).body(content.all());
    }

    @GetMapping("/{section:services|sectors|guides|projects|about|method|english}")
    public ResponseEntity<JsonNode> section(@PathVariable String section) {
        return ResponseEntity.ok().cacheControl(CACHE).body(content.page(section));
    }

    @GetMapping("/{section:services|sectors|guides|projects}/{slug}")
    public ResponseEntity<JsonNode> detail(@PathVariable String section, @PathVariable String slug) {
        return ResponseEntity.ok().cacheControl(CACHE).body(content.find(section, slug));
    }

    @GetMapping("/projects/{slug}/products")
    public ResponseEntity<JsonNode> projectProducts(@PathVariable String slug) {
        return ResponseEntity.ok().cacheControl(CACHE).body(content.find("projects", slug).path("productUses"));
    }

    @GetMapping("/projects/{slug}/media/{filename}")
    public ResponseEntity<Resource> media(@PathVariable String slug, @PathVariable String filename) {
        Resource resource = content.media(slug, filename);
        var response = ResponseEntity.ok().cacheControl(CACHE).header("X-Content-Type-Options", "nosniff");
        if (filename.endsWith(".pdf")) {
            response.header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(filename).build().toString());
        }
        return response.contentType(MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM)).body(resource);
    }
}
