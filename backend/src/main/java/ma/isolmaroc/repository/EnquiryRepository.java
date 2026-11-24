package ma.isolmaroc.repository;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFileAttributeView;
import java.nio.file.attribute.PosixFilePermissions;
import java.sql.DriverManager;
import java.sql.SQLException;
import ma.isolmaroc.dto.Enquiry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class EnquiryRepository {
    private final String url;

    public EnquiryRepository(@Value("${quotes.database}") String database) throws SQLException, IOException {
        restrictFilePermissions(Path.of(database).toAbsolutePath());
        url = "jdbc:sqlite:" + database;
        try (var connection = DriverManager.getConnection(url); var statement = connection.createStatement()) {
            statement.execute("""
                    CREATE TABLE IF NOT EXISTS enquiries (
                        reference TEXT PRIMARY KEY, full_name TEXT NOT NULL, company TEXT NOT NULL,
                        email TEXT NOT NULL, phone TEXT NOT NULL, project_type TEXT NOT NULL, city TEXT NOT NULL,
                        surface_m2 NUMERIC, deadline TEXT, description TEXT NOT NULL, consent INTEGER NOT NULL,
                        plan_pdf BLOB, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )
                    """);
        }
    }

    private static void restrictFilePermissions(Path database) throws IOException {
        if (Files.getFileAttributeView(database.getParent(), PosixFileAttributeView.class) == null) return;
        var ownerOnly = PosixFilePermissions.fromString("rw-------");
        try {
            Files.createFile(database, PosixFilePermissions.asFileAttribute(ownerOnly));
        } catch (FileAlreadyExistsException exists) {
            Files.setPosixFilePermissions(database, ownerOnly);
        }
    }

    public void save(String reference, Enquiry enquiry, byte[] plan) throws SQLException {
        try (var connection = DriverManager.getConnection(url);
             var statement = connection.prepareStatement("""
                     INSERT INTO enquiries(reference, full_name, company, email, phone, project_type,
                         city, surface_m2, deadline, description, consent, plan_pdf)
                     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                     """)) {
            statement.setString(1, reference);
            statement.setString(2, enquiry.fullName());
            statement.setString(3, enquiry.company());
            statement.setString(4, enquiry.email());
            statement.setString(5, enquiry.phone());
            statement.setString(6, enquiry.projectType());
            statement.setString(7, enquiry.city());
            statement.setBigDecimal(8, enquiry.surface());
            statement.setString(9, enquiry.deadline() == null ? null : enquiry.deadline().toString());
            statement.setString(10, enquiry.description());
            statement.setBoolean(11, enquiry.consent());
            statement.setBytes(12, plan);
            statement.executeUpdate();
        }
    }
}
