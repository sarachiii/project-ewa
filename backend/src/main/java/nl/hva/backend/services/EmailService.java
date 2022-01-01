package nl.hva.backend.services;

import nl.hva.backend.rest.config.WebConfig;
import nl.hva.backend.rest.exception.BadGatewayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private WebConfig webConfig;

    public void sendSimpleMessage(String recipient, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(webConfig.getMailHost());
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(body);

        try {
            emailSender.send(message);
        } catch (MailException e) {
            throw new BadGatewayException("Could not send email");
        }
    }

}
