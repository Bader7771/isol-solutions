package ma.isolmaroc.repository;

import java.sql.DriverManager;
import java.sql.SQLException;
import ma.isolmaroc.dto.Quote;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class QuoteRepository {
    private final String url;
    public QuoteRepository(@Value("${quotes.database}") String file) throws SQLException {
        url = "jdbc:sqlite:" + file;
        try (var connection = DriverManager.getConnection(url); var statement = connection.createStatement()) {
            statement.execute("""
                CREATE TABLE IF NOT EXISTS devis_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, email TEXT NOT NULL,
                telephone TEXT, entreprise TEXT, message TEXT NOT NULL, produit TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
                """);
        }
    }
    public void save(Quote q) throws SQLException {
        try (var connection = DriverManager.getConnection(url); var insert = connection.prepareStatement(
                "INSERT INTO devis_requests(nom,email,telephone,entreprise,message,produit) VALUES(?,?,?,?,?,?)")) {
            insert.setString(1,q.nom()); insert.setString(2,q.email()); insert.setString(3,q.telephone());
            insert.setString(4,q.entreprise()); insert.setString(5,q.message()); insert.setString(6,q.produit());
            insert.executeUpdate();
        }
    }
}
