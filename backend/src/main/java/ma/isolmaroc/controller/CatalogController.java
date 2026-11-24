package ma.isolmaroc.controller;

import ma.isolmaroc.service.Catalog;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.*;

@RestController
public record CatalogController(Catalog catalog) {
    @GetMapping("/api/catalog") public JsonNode catalogData() { return catalog.data(); }
    @GetMapping("/api/products/categories") public JsonNode categories() { return catalog.data().get("categories"); }
    @GetMapping("/api/products/{id}") public JsonNode product(@PathVariable String id) { return catalog.product(id); }
    @GetMapping("/api/products") public List<JsonNode> products(@RequestParam(defaultValue="") String q,
            @RequestParam(defaultValue="") String category, @RequestParam(defaultValue="default") String sort) {
        return catalog.search(q, category, sort);
    }
}
