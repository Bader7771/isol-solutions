package ma.isolmaroc;

import ma.isolmaroc.dto.Enquiry;
import ma.isolmaroc.repository.EnquiryRepository;
import ma.isolmaroc.service.Enquiries;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.sql.DriverManager;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(properties="spring.mail.username=")
@AutoConfigureMockMvc
class EnquiryTest {
    private static final String VALID = """
            {"fullName":" Camélia Test ","company":"Test local","email":"camelia@example.invalid","phone":"+212 612345678",
             "projectType":"sante","city":"Fès","surface":123.45,"deadline":"2099-05-01",
             "description":"Préparation du local avant installation.","consent":true}
            """;
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    static Path database;

    @DynamicPropertySource static void configure(DynamicPropertyRegistry registry) throws Exception {
        database = Files.createTempFile("isol-enquiry-", ".db");
        database.toFile().deleteOnExit();
        registry.add("quotes.database", database::toString);
    }

    private MockMultipartFile requestPart() {
        return new MockMultipartFile("request", "", "application/json", VALID.getBytes(StandardCharsets.UTF_8));
    }

    @Test void persistsQualifiedRequestAndAttachmentTogether() throws Exception {
        byte[] plan = "%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF\n".getBytes(StandardCharsets.US_ASCII);
        var file = new MockMultipartFile("plan","plan.pdf","application/pdf",plan);
        var result = mvc.perform(multipart("/api/enquiries").file(requestPart()).file(file))
                .andExpect(status().isCreated()).andReturn();
        String reference = mapper.readTree(result.getResponse().getContentAsByteArray()).get("reference").asText();
        try (var db = DriverManager.getConnection("jdbc:sqlite:" + database);
             var statement = db.prepareStatement("SELECT * FROM enquiries WHERE reference=?")) {
            statement.setString(1, reference);
            try (var row = statement.executeQuery()) {
                assertTrue(row.next());
                assertEquals("Camélia Test", row.getString("full_name"));
                assertEquals("Fès", row.getString("city"));
                assertEquals("sante", row.getString("project_type"));
                assertEquals("2099-05-01", row.getString("deadline"));
                assertEquals(123.45, row.getDouble("surface_m2"));
                assertArrayEquals(plan, row.getBytes("plan_pdf"));
            }
        }
    }

    @Test void acceptsOptionalSurfaceDateAndPlan() throws Exception {
        String json = VALID.replace("123.45", "null").replace("\"2099-05-01\"", "null");
        mvc.perform(post("/api/enquiries").contentType("application/json").content(json))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.reference").isString());
    }

    @Test void rejectsInvalidFieldsAndMalformedAttachment() throws Exception {
        for (var json : new String[]{VALID.replace("true", "false"), VALID.replace("123.45","-4"),
                VALID.replace("sante","unknown"), VALID.replace("+212 612345678","-"),
                VALID.replace("2099-05-01","2000-01-01"), VALID.replace("camelia@example.invalid","bad")}) {
            mvc.perform(post("/api/enquiries").contentType("application/json").content(json))
                    .andExpect(status().isBadRequest());
        }
        var file = new MockMultipartFile("plan","plan.pdf","application/pdf", "No document".getBytes(StandardCharsets.US_ASCII));
        mvc.perform(multipart("/api/enquiries").file(requestPart()).file(file)).andExpect(status().isBadRequest());
        var oversized = new MockMultipartFile("plan","plan.pdf","application/pdf", new byte[5*1024*1024+1]);
        mvc.perform(multipart("/api/enquiries").file(requestPart()).file(oversized)).andExpect(status().isPayloadTooLarge());
    }

    @Test void smtpFailurePreservesReceipt() throws Exception {
        var repo = mock(EnquiryRepository.class);
        var mail = mock(JavaMailSender.class);
        doThrow(new MailSendException("offline")).when(mail).send(any(SimpleMailMessage.class));
        var service = new Enquiries(repo, mail, "site@example.invalid", new String[]{"team@example.invalid"});
        var enquiry = mapper.readValue(VALID, Enquiry.class);
        String ref = service.submit(enquiry, null);
        var order = inOrder(repo, mail);
        order.verify(repo).save(ref, enquiry, null);
        order.verify(mail).send(any(SimpleMailMessage.class));
    }
}
