package nl.hva.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.User;
import nl.hva.backend.rest.AuthController;
import nl.hva.backend.rest.security.JWTokenUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@SpringBootTest
public class TestAuthController {
    private static final String STUB_EMAIL_ID = "m.fuckner@ccu.org";
    private static final String STUB_PASSWORD_ID = "MFuckner123";

    @Autowired
    private AuthController authController;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private JWTokenUtils jwTokenUtils;

    @Test
    @Transactional
    void testToken() {
        String token = jwTokenUtils.encode(STUB_EMAIL_ID, false);

        //Arrange:
        //mapping the email and the passowrd to the request
        ObjectNode objectNode = this.mapper.createObjectNode();
        objectNode.put("email", STUB_EMAIL_ID);
        objectNode.put("password", STUB_PASSWORD_ID);

        //Act:
        //make the request to get the token in response
        ResponseEntity<User> response = this.authController.logInForAuth(objectNode);

        //Assert:
        //check if the request return a valid response with Accepted status
        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());

        //save the token form the response header
        List<String> tokenInResponse = response.getHeaders().get("Authorization");

        //check if the token received token from the response matches the encoded token instance
        assertEquals(tokenInResponse.get(0),String.format("Bearer %s", token));
    }


}
