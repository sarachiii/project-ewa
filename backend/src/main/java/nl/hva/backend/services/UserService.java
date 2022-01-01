package nl.hva.backend.services;

import nl.hva.backend.models.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {

    private static final String DEFAULT_SUBJECT = "Welcome!";

    public HashMap<String, String> generateMail(User user){
        return generateMail(user, DEFAULT_SUBJECT);
    }

    public HashMap<String, String> generateMail(User user, String subject) {
        HashMap<String, String> mail = new HashMap<>();

        String body = String.format(
                "Dear %s %s,%n%nYou've been invited to join team %d at Climate Cleanup!" +
                        "%n%nYour username: %s%nYour password: %s%n%n" +
                        "Please change your password.%n%nSincerely,%n%nClimate Cleanup",
                user.getFirstName(), user.getLastName(), user.getTeamId(),
                user.getEmailAddress(), user.getPassword()
                );

        mail.put("recipient", user.getEmailAddress());
        mail.put("subject", subject);
        mail.put("body", body);

        return mail;
    }

}
