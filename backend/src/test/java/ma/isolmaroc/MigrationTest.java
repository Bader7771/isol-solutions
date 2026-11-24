package ma.isolmaroc;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import java.nio.file.*;
import java.sql.DriverManager;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties="spring.mail.username=")
@AutoConfigureMockMvc
class MigrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    static Path database;
    @DynamicPropertySource static void database(DynamicPropertyRegistry registry) throws Exception {
        database=Files.createTempFile("isolmaroc-test-", ".db");
        database.toFile().deleteOnExit();
        registry.add("quotes.database",database::toString);
    }
    @Test void completeCatalogMatchesSource() throws Exception {
        var data=mapper.readTree(Path.of("../data/processed/products_clean.json").toFile());
        var response=mvc.perform(get("/api/catalog")).andExpect(status().isOk()).andReturn().getResponse();
        assertEquals(data,mapper.readTree(response.getContentAsByteArray()));
        for (var product:data.get("products")) {
            var detail=mvc.perform(get("/api/products/"+product.get("product_id").asText())).andExpect(status().isOk()).andReturn();
            assertEquals(product,mapper.readTree(detail.getResponse().getContentAsByteArray()));
            for (var image:product.get("images")) assertTrue(Files.isRegularFile(Path.of("..",image.asText())));
            for (var doc:product.get("technical_documents")) assertTrue(Files.isRegularFile(Path.of("..",doc.get("path").asText())));
        }
        mvc.perform(get("/api/products").param("q","ROCKFACADE").param("category","laine-de-roche").param("sort","az")).andExpect(jsonPath("$[0].product_id").value("rockwool-rockfacade"));
        mvc.perform(get("/api/products/missing")).andExpect(status().isNotFound());
        mvc.perform(get("/api/products").param("sort","bad")).andExpect(status().isBadRequest());
    }
    @Test void quoteValidationAndPersistence() throws Exception {
        mvc.perform(post("/submit-devis").contentType("application/json").content("{}")).andExpect(status().isBadRequest());
        mvc.perform(post("/submit-devis").contentType("application/json").content("""
            {"nom":" QA ","email":"qa@example.invalid","message":" Essai ","produit":"Panneau"}
            """)).andExpect(status().isOk()).andExpect(jsonPath("$.success").value(true));
        try(var db=DriverManager.getConnection("jdbc:sqlite:"+database);var query=db.createStatement();
            var rows=query.executeQuery("SELECT nom,message,produit FROM devis_requests")) {
            assertTrue(rows.next()); assertEquals("QA",rows.getString(1));assertEquals("Essai",rows.getString(2));assertEquals("Panneau",rows.getString(3));
        }
    }
}
