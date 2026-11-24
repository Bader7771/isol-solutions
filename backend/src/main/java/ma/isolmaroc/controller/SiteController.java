package ma.isolmaroc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SiteController {
    @GetMapping({"/", "/catalogue.html", "/categorie.html", "/produit.html", "/apropos.html",
            "/services.html", "/contact.html", "/diagnostic.html", "/blog.html",
            "/article-isolation-phonique.html", "/confidentialite.html"})
    public String page() { return "forward:/index.html"; }
}
