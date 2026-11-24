package ma.isolmaroc.service;

import ma.isolmaroc.dto.Quote;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ContactDelivery {
    private final RestClient client;
    public ContactDelivery(@Value("${contact.endpoint}") String endpoint) {
        var factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5000);
        factory.setReadTimeout(15000);
        client = RestClient.builder().baseUrl(endpoint).requestFactory(factory).build();
    }
    public void send(Quote q) {
        var form = new LinkedMultiValueMap<String,String>();
        form.add("Date",LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
        form.add("Nom complet",q.nom()); form.add("Entreprise",q.entreprise());
        form.add("Email",q.email()); form.add("Téléphone",q.telephone()); form.add("Message",q.message());
        try { client.post().contentType(MediaType.APPLICATION_FORM_URLENCODED).body(form).retrieve().toBodilessEntity(); }
        catch (RestClientException ex) { throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,"Envoi impossible. Veuillez réessayer."); }
    }
}
