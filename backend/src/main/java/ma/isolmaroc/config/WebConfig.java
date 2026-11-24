package ma.isolmaroc.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${cors.origins}") private String[] origins;
    public void addCorsMappings(CorsRegistry cors) {
        cors.addMapping("/**").allowedOrigins(origins).allowedMethods("GET","POST");
    }
}
