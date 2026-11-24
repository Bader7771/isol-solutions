package ma.isolmaroc;

import ma.isolmaroc.dto.Quote;
import ma.isolmaroc.repository.QuoteRepository;
import ma.isolmaroc.service.Quotes;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.*;
import org.springframework.mail.javamail.JavaMailSender;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class NotificationTest {
    @Test void savedQuoteSurvivesNotificationFailure() throws Exception {
        var repository=mock(QuoteRepository.class);
        var mail=mock(JavaMailSender.class);
        var recipients=new String[]{"team@example.invalid","orders@example.invalid"};
        var service=new Quotes(repository,mail,"qa@example.invalid",recipients);
        var quote=new Quote("Test","contact@example.invalid","0600000000","Client","Essai","Panneau");
        doThrow(new MailSendException("offline")).when(mail).send(any(SimpleMailMessage.class));
        service.submit(quote);
        var message=ArgumentCaptor.forClass(SimpleMailMessage.class);
        var order=inOrder(repository,mail);
        order.verify(repository).save(quote);
        order.verify(mail).send(message.capture());
        assertArrayEquals(recipients,message.getValue().getTo());
        assertTrue(message.getValue().getSubject().contains("Panneau"));
        assertTrue(message.getValue().getText().contains("Essai"));
    }
}
