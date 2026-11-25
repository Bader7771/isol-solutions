package ma.isolmaroc.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;

@Controller
public class SiteController {
    private final Path frontendDirectory;

    public SiteController(@Value("${frontend.dist}") String frontend) {
        frontendDirectory = Path.of(frontend).toAbsolutePath().normalize();
    }

    @GetMapping({"/", "/catalogue.html", "/categorie.html", "/produit.html", "/apropos.html",
            "/services.html", "/contact.html", "/contact", "/diagnostic.html", "/blog.html",
            "/article-isolation-phonique.html", "/confidentialite.html", "/expertises",
            "/secteurs", "/guides", "/realisations",
            "/methode", "/a-propos", "/en"})
    public String page(HttpServletRequest request) { return shell(request.getRequestURI()); }

    @GetMapping({"/produits/{slug}", "/expertises/{slug}", "/secteurs/{slug}", "/guides/{slug}", "/realisations/{slug}"})
    public String detailPage(HttpServletRequest request) {
        return shell(request.getRequestURI());
    }

    private String shell(String uri) {
        Path page = frontendDirectory.resolve("." + uri).resolve("index.html").normalize();
        if (page.startsWith(frontendDirectory) && Files.isRegularFile(page)) return "forward:" + uri + "/index.html";
        return "forward:/index.html";
    }
}
