package ma.isolmaroc.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public record Enquiry(
        @NotBlank @Size(max = 150) String fullName,
        @NotBlank @Size(max = 200) String company,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(max = 32) @Pattern(regexp = "(?=(?:\\D*\\d){7,15}\\D*$)\\+?[0-9 .()\\-]+") String phone,
        @NotBlank @Pattern(regexp = "sante|acoustique|thermique|btp|autre") String projectType,
        @NotBlank @Size(max = 150) String city,
        @Positive @Digits(integer = 9, fraction = 2) BigDecimal surface,
        @FutureOrPresent LocalDate deadline,
        @NotBlank @Size(min = 10, max = 8000) String description,
        @NotNull @AssertTrue Boolean consent) {

    public Enquiry {
        fullName = strip(fullName);
        company = strip(company);
        email = strip(email);
        phone = strip(phone);
        city = strip(city);
        projectType = strip(projectType);
        description = strip(description);
    }

    private static String strip(String value) {
        return value == null ? null : value.strip();
    }
}
