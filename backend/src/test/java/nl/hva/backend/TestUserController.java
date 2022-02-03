package nl.hva.backend;

import nl.hva.backend.models.User;
import nl.hva.backend.rest.UserController;
import nl.hva.backend.rest.exception.ConflictException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.security.JWTokenUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Sarah Chrzanowska-Buth
 */
//@TestConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestUserController {
    private static final String STUB_EMAIL_ID = "m.fuckner@ccu.org";


    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserController controller;

    @Autowired
    private JWTokenUtils jwTokenUtils;

    @BeforeEach
    @DirtiesContext
    void setUp() {
        String token = jwTokenUtils.encode(STUB_EMAIL_ID, false);

        restTemplate.getRestTemplate().getInterceptors().add((req, body, execution) -> {
            req.getHeaders().add("Authorization", "Bearer " + token);
            return execution.execute(req, body);
        });
    }


    @Test
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testDeleteUnknownUser() throws ResourceNotFound {

        // Arrange: Create a userId to be deleted
        long notExistingUserId = Long.MAX_VALUE;

        // Act: Delete the user
        ResourceNotFound thrown = assertThrows(ResourceNotFound.class, () -> {
            controller.deleteUser(notExistingUserId);
        }, "ResourceNotFoundException was expected");

        // Assert: check if the correct error message appears
        assertEquals("no user with this id exist to be deleted", thrown.getMessage());
    }

    /**
     * @author Mohamad Hassan
     */
    @Test
    @DirtiesContext
    void testCresteExistedUser() {
        //Arrange:
        //mock the existed user
        User user = new User();
        user.setEmailAddress(STUB_EMAIL_ID);
        user.setPassword("MFuckner123");
        user.setRole(User.Role.MEMBER);

        //Act:
        //do a request to creat that user
        ResponseEntity<ConflictException> userResponseEntity = this.restTemplate.postForEntity("/users", user, ConflictException.class);

        //Assert:
        //Check if the response is a Http error response of the type CONFLICT
        assertEquals(userResponseEntity.getStatusCode(),HttpStatus.CONFLICT );
        //Check if the response contains the right message
        assertEquals("The user already exists in the database",userResponseEntity.getBody().getMessage() );


    }
}
