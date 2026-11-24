package ma.isolmaroc.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${cors.origins}") private String[] origins;
    @Value("${frontend.dist}") private String frontend;
    @Override public void addResourceHandlers(ResourceHandlerRegistry resources) {
        String directory = java.nio.file.Path.of(frontend).toAbsolutePath().normalize().toString() + "/";
        resources.addResourceHandler("/**").addResourceLocations(new org.springframework.core.io.FileSystemResource(directory));
    }
    @Override public void addCorsMappings(CorsRegistry cors) {
        cors.addMapping("/**").allowedOrigins(origins).allowedMethods("GET","POST");
    }
}
