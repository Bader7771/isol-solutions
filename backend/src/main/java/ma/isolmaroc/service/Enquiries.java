package ma.isolmaroc.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.Locale;
import java.util.UUID;
import ma.isolmaroc.dto.Enquiry;
import ma.isolmaroc.repository.EnquiryRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class Enquiries {
    private static final int MAX_BYTES = 5 * 1024 * 1024;
    private final EnquiryRepository repository;
    private final JavaMailSender mail;
    private final String sender;
    private final String[] recipients;

    public Enquiries(EnquiryRepository repository, JavaMailSender mail,
                     @Value("${spring.mail.username}") String sender,
                     @Value("${quotes.recipients}") String[] recipients) {
        this.repository = repository;
        this.mail = mail;
        this.sender = sender;
        this.recipients = recipients;
    }

    public String submit(Enquiry enquiry, MultipartFile plan) throws SQLException {
        byte[] document = readPlan(plan);
        String reference = UUID.randomUUID().toString();
        repository.save(reference, enquiry, document);
        if (!sender.isBlank()) notifyTeam(reference, enquiry, document != null);
        return reference;
    }

    private byte[] readPlan(MultipartFile file) {
        if (file == null) return null;
        if (file.getSize() > MAX_BYTES) {
            throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE, "Le plan dépasse 5 Mo.");
        }
        String name = file.getOriginalFilename();
        if (file.isEmpty() || name == null || !name.toLowerCase(Locale.ROOT).endsWith(".pdf")
                || !"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Joignez un document PDF.");
        }
        try {
            byte[] bytes = file.getBytes();
            var header = new String(bytes, 0, Math.min(bytes.length, 8), StandardCharsets.US_ASCII);
            int tail = Math.min(bytes.length, 1024);
            var trailer = new String(bytes, bytes.length - tail, tail, StandardCharsets.US_ASCII).stripTrailing();
            if (!header.matches("%PDF-[12]\\.[0-9]") || !trailer.endsWith("%%EOF")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le document PDF paraît incomplet.");
            }
            return bytes;
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Impossible de lire le plan joint.");
        }
    }

    private void notifyTeam(String reference, Enquiry enquiry, boolean hasPlan) {
        var message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(recipients);
        message.setReplyTo(enquiry.email());
        message.setSubject("ISOL SOLUTIONS — Demande de visite " + reference);
        message.setText("""
                Référence : %s
                Projet : %s
                Ville : %s
                Société : %s
                Contact : %s
                Email : %s
                Téléphone : %s
                Surface : %s
                Échéance : %s
                Plan joint au dossier : %s

                %s
                """.formatted(reference, enquiry.projectType(), enquiry.city(), enquiry.company(),
                enquiry.fullName(), enquiry.email(), enquiry.phone(),
                enquiry.surface() == null ? "À préciser" : enquiry.surface() + " m²",
                enquiry.deadline() == null ? "À préciser" : enquiry.deadline(), hasPlan ? "Oui" : "Non",
                enquiry.description()));
        try {
            mail.send(message);
        } catch (MailException ex) {
            LoggerFactory.getLogger(Enquiries.class).warn("Enquiry {} saved, SMTP delivery failed", reference);
        }
    }
}
