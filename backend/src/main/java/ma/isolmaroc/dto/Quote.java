package ma.isolmaroc.dto;

import jakarta.validation.constraints.*;

public record Quote(@NotBlank @Size(max=300) String nom, @Email @NotBlank @Size(max=254) String email,
        @Size(max=100) String telephone, @Size(max=300) String entreprise,
        @NotBlank @Size(max=16000) String message, @Size(max=500) String produit) {
    public Quote {
        nom = clean(nom); email = clean(email); telephone = clean(telephone);
        entreprise = clean(entreprise); message = clean(message); produit = clean(produit);
    }
    private static String clean(String value) { return value == null ? "" : value.strip(); }
}
