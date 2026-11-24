package ma.isolmaroc.service;

import com.fasterxml.jackson.databind.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.io.*;
import java.text.*;
import java.util.*;

@Service
public class Catalog {
    private final JsonNode data;
    public Catalog(ObjectMapper mapper, @Value("${catalog.file}") File file) throws IOException {
        data = mapper.readTree(file);
        if (!data.path("products").isArray() || !data.path("categories").isObject())
            throw new IOException("Invalid catalog format");
    }
    public JsonNode data() { return data; }
    public JsonNode product(String id) {
        for (var product : data.get("products"))
            if (id.equals(product.path("product_id").asText())) return product;
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit introuvable.");
    }
    private static String normalized(String value) {
        return Normalizer.normalize(value, Normalizer.Form.NFD).replaceAll("\\p{M}", "").toLowerCase(Locale.ROOT);
    }
    public List<JsonNode> search(String q, String category, String sort) {
        List<JsonNode> results = new ArrayList<>();
        for (var product : data.get("products")) {
            if (!category.isBlank() && !category.equals(product.path("category_id").asText())) continue;
            var fields = new StringJoiner(" ");
            for (String field : List.of("product_name","brand","category_name","short_description","full_description"))
                fields.add(product.path(field).asText());
            product.path("specifications").fields().forEachRemaining(e -> fields.add(e.getKey()).add(e.getValue().asText()));
            String text = normalized(fields.toString());
            if (Arrays.stream(normalized(q).trim().split("\\s+")).allMatch(text::contains)) results.add(product);
        }
        Comparator<JsonNode> names = Comparator.comparing(p -> p.path("product_name").asText(), Collator.getInstance(Locale.FRENCH));
        switch (sort) {
            case "az" -> results.sort(names);
            case "za" -> results.sort(names.reversed());
            case "documents" -> results.sort(Comparator.comparingInt(p -> -p.path("technical_documents").size()));
            case "default" -> {}
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tri invalide.");
        }
        return results;
    }
}
