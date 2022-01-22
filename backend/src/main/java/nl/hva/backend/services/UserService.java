package nl.hva.backend.services;

import net.bytebuddy.utility.RandomString;
import nl.hva.backend.models.User;
import nl.hva.backend.rest.exception.InternalServerErrorException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;

@Service
public class UserService {

    private static final String DEFAULT_SUBJECT = "Welcome to Climate Cleanup!";
    private static final Random RANDOM = new Random();
    private static final int UPPERBOUND_INCREMENT = 1;
    private static final BCryptPasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

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

    public String generateRandomPassword() {
        // Get random number between 8-16
        int length = RANDOM.nextInt(RandomString.DEFAULT_LENGTH + UPPERBOUND_INCREMENT) + RandomString.DEFAULT_LENGTH;

        return generateRandomPassword(length);
    }

    public String generateRandomPassword(int length) {
        return RandomString.make(length);
    }

    public String encode(String password) throws InternalServerErrorException {
        // Return encoded password
        return PASSWORD_ENCODER.encode(password);
    }

    public boolean matches(String password, String hashedPassword) {
        // Check if the passwords match
        return PASSWORD_ENCODER.matches(password, hashedPassword);
    }

}
