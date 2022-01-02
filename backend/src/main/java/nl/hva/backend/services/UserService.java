package nl.hva.backend.services;

import net.bytebuddy.utility.RandomString;
import nl.hva.backend.models.User;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;

@Service
public class UserService {

    private static final String DEFAULT_SUBJECT = "Welcome!";
    private static final Random RANDOM = new Random();
    private static final int UPPERBOUND_INCREMENT = 1;
    private static final String SHA_256 = "SHA-256";

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

    public String encode(String password) throws NoSuchAlgorithmException {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);

        // TODO: When JWT added change to SignatureAlgorithm.HS512.getJcaName() or something similar
        MessageDigest md = MessageDigest.getInstance(SHA_256);
        md.update(salt);
        byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));

        return new String(Hex.encode(hash));
    }

}
