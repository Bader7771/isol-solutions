package ma.isolmaroc.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/** Read-only, startup-loaded view of the material cleared for the public website. */
@Service
public class SiteContent {
    private static final Pattern SLUG = Pattern.compile("[a-z0-9]+(?:-[a-z0-9]+)*");
    private static final Pattern PHOTO = Pattern.compile("[a-z0-9-]+\\.(jpg|jpeg|webp|png)");
    private static final Pattern PDF = Pattern.compile("[a-z0-9-]+\\.pdf");
    private final ObjectNode pages;
    private final Map<String, ClassPathResource> publishedFiles = new HashMap<>();

    public SiteContent(ObjectMapper mapper) throws IOException {
        try (var site = new ClassPathResource("content/site.json").getInputStream();
             var register = new ClassPathResource("content/project-register.json").getInputStream()) {
            pages = mapper.readValue(site, ObjectNode.class);
            pages.set("projects", publishedProjects(mapper, mapper.readTree(register)));
        }
    }

    ArrayNode publishedProjects(ObjectMapper mapper, JsonNode register) throws IOException {
        ArrayNode result = mapper.createArrayNode();
        for (JsonNode entry : register) {
            if (!entry.path("approvedForPublication").asBoolean()
                    || !entry.path("commissioningPartyWrittenApproval").asBoolean()
                    || (entry.path("hospital").asBoolean() && !entry.path("hospitalWrittenApproval").asBoolean())) {
                continue;
            }
            JsonNode source = entry.required("reference");
            String slug = source.required("slug").asText();
            if (!SLUG.matcher(slug).matches()) {
                throw new IOException("Invalid project slug in publication register");
            }
            ObjectNode project = result.addObject();
            for (String key : List.of("slug", "title", "sector", "location", "context", "constraints", "solutions", "duration")) {
                project.set(key, source.required(key));
            }
            publishMedia(source, project, slug, true);
            publishMedia(source, project, slug, false);
        }
        return result;
    }

    private void publishMedia(JsonNode source, ObjectNode project, String slug, boolean photo) throws IOException {
        String field = photo ? "photos" : "documents";
        ArrayNode assets = project.putArray(field);
        for (JsonNode item : source.required(field)) {
            if (!item.path("approvedForPublication").asBoolean()) continue;
            String filename = item.required("file").asText();
            if (!(photo ? PHOTO : PDF).matcher(filename).matches()) {
                throw new IOException("Invalid reference asset filename for " + slug);
            }
            String key = slug + "/" + filename;
            ClassPathResource file = new ClassPathResource("content/reference-media/" + key);
            if (!file.exists()) throw new IOException("Missing approved reference asset " + key);
            publishedFiles.put(key, file);
            ObjectNode asset = assets.addObject();
            asset.put("url", "/api/projects/" + slug + "/media/" + filename);
            if (photo) {
                asset.set("alt", item.required("alt"));
                asset.set("stage", item.path("stage"));
            } else {
                asset.set("label", item.required("label"));
            }
        }
    }

    public JsonNode all() { return pages; }
    public JsonNode page(String key) { return pages.required(key); }

    public JsonNode find(String collection, String slug) {
        for (JsonNode page : pages.required(collection)) {
            if (page.path("slug").asText().equals(slug)) return page;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Page introuvable.");
    }

    public ClassPathResource media(String slug, String filename) {
        var file = publishedFiles.get(slug + "/" + filename);
        if (file == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fichier introuvable.");
        return file;
    }
}
