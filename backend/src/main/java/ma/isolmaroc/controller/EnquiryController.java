package ma.isolmaroc.controller;

import jakarta.validation.Valid;
import java.sql.SQLException;
import ma.isolmaroc.dto.Enquiry;
import ma.isolmaroc.service.Enquiries;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/enquiries")
public record EnquiryController(Enquiries enquiries) {
    public record Receipt(String reference) {}

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Receipt submit(@Valid @RequestPart("request") Enquiry request,
                          @RequestPart(value = "plan", required = false) MultipartFile plan) throws SQLException {
        return new Receipt(enquiries.submit(request, plan));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Receipt submit(@Valid @RequestBody Enquiry request) throws SQLException {
        return new Receipt(enquiries.submit(request, null));
    }
}
