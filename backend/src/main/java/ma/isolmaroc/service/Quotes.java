package ma.isolmaroc.service;

import ma.isolmaroc.dto.Quote;
import java.sql.SQLException;
import ma.isolmaroc.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.LoggerFactory;

@Service
public class Quotes {
    private final String sender;
    private final QuoteRepository repository;
    private final String[] recipients;
    private final JavaMailSender mail;
    public Quotes(QuoteRepository repository, JavaMailSender mail,
            @Value("${spring.mail.username}") String sender, @Value("${quotes.recipients}") String[] recipients) throws SQLException {
        this.repository = repository;
        this.mail = mail;
        this.sender = sender;
        this.recipients = recipients;
    }
    public void submit(Quote q) throws SQLException {
        repository.save(q);
        if (sender.isBlank()) return;
        var notification = new SimpleMailMessage();
        notification.setFrom(sender);
        notification.setTo(recipients);
        notification.setSubject("Nouvelle demande de devis - " + q.produit().replaceAll("[\\r\\n]", " "));
        notification.setText(String.join("\n", q.nom(), q.email(), q.telephone(), q.entreprise(), q.produit(), q.message()));
        try { mail.send(notification); }
        catch (MailException ex) { LoggerFactory.getLogger(Quotes.class).warn("Quote saved; notification delivery failed"); }
    }
}
