package ma.isolmaroc.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class SiteContentTest {
    private final ObjectMapper mapper = new ObjectMapper();

    @Test void publicCollectionsExcludeUnreleasedReferences() throws Exception {
        var content = new SiteContent(mapper);
        assertEquals(4, content.page("services").size());
        assertEquals(4, content.page("guides").size());
        assertEquals(6, content.page("sectors").size());
        assertEquals(5, content.page("method").path("sections").size());
        assertTrue(content.find("services", "sante-radioprotection").toString().contains("physicien médical"));
        assertFalse(content.all().toString().contains("BIOMEDECA"));
        assertThrows(ResponseStatusException.class, () -> content.find("projects","salle-hdr-fes"));
        assertThrows(ResponseStatusException.class, () -> content.media("salle-hdr-fes","photo.jpg"));
    }

    @Test void hospitalRecordsNeedBothAuthorizationsAndEachAssetNeedsApproval() throws Exception {
        var content = new SiteContent(mapper);
        var register = mapper.readTree("""
            [{"approvedForPublication":true,"hospital":true,"commissioningPartyWrittenApproval":true,
              "reference":{"slug":"chantier","title":"Chantier","context":"Travaux","sector":"Santé",
                "location":"Fès","constraints":[],"solutions":[],"duration":null,"photos":[],
                "documents":[{"file":"prive.pdf","label":"Privé","approvedForPublication":false}]}}]
            """);
        var entry = (com.fasterxml.jackson.databind.node.ObjectNode)register.get(0);
        assertTrue(content.publishedProjects(mapper, register).isEmpty());
        entry.put("hospitalWrittenApproval", true);
        var project = content.publishedProjects(mapper,register).get(0);
        assertEquals("chantier",project.path("slug").asText());
        assertTrue(project.path("documents").isEmpty());
        var doc = (com.fasterxml.jackson.databind.node.ObjectNode)entry.path("reference").path("documents").get(0);
        doc.put("approvedForPublication",true);
        assertThrows(IOException.class, () -> content.publishedProjects(mapper,register));
        doc.put("file","../internal.pdf");
        assertThrows(IOException.class, () -> content.publishedProjects(mapper,register));
    }
}
