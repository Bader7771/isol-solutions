package ma.isolmaroc.service;

import ma.isolmaroc.dto.Quote;
import java.sql.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.LoggerFactory;

@Service
public class Quotes {
    private final String url, sender;
    private final String[] recipients;
    private final JavaMailSender mail;
    public Quotes(@Value("${quotes.database}") String file, JavaMailSender mail,
            @Value("${spring.mail.username}") String sender, @Value("${quotes.recipients}") String[] recipients) throws SQLException {
        this.url = "jdbc:sqlite:" + file;
        this.mail = mail;
        this.sender = sender;
        this.recipients = recipients;
        try (var connection = DriverManager.getConnection(url); var statement = connection.createStatement()) {
            statement.execute("""
                CREATE TABLE IF NOT EXISTS devis_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, email TEXT NOT NULL,
                telephone TEXT, entreprise TEXT, message TEXT NOT NULL, produit TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
                """);
        }
    }
    public void submit(Quote q) throws SQLException {
        try (var connection = DriverManager.getConnection(url); var insert = connection.prepareStatement(
                "INSERT INTO devis_requests(nom,email,telephone,entreprise,message,produit) VALUES(?,?,?,?,?,?)")) {
            insert.setString(1,q.nom()); insert.setString(2,q.email()); insert.setString(3,q.telephone());
            insert.setString(4,q.entreprise()); insert.setString(5,q.message()); insert.setString(6,q.produit());
            insert.executeUpdate();
        }
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
