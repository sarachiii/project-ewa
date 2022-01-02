package nl.hva.backend.services;

import nl.hva.backend.rest.config.WebConfig;
import nl.hva.backend.rest.exception.BadGatewayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    private static final String PERSONAL = "Climate Cleanup";

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private WebConfig webConfig;

    public void sendMimeMessage(String recipient, String subject, String body) {
        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper messageHelper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());

        try {
            messageHelper.setFrom(webConfig.getMailHost(), PERSONAL);
            messageHelper.setTo(recipient);
            messageHelper.setSubject(subject);
            messageHelper.setText(body);
            emailSender.send(message);
        } catch (MailException | MessagingException | UnsupportedEncodingException e) {
            throw new BadGatewayException("Could not send email");
        }
    }

}
