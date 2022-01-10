package nl.hva.backend;

import nl.hva.backend.rest.UserController;
import nl.hva.backend.rest.exception.ResourceNotFound;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @author Sarah Chrzanowska-Buth
 */
@SpringBootTest
public class TestUserController {

    @Autowired
    private UserController controller;

    @Test
    @Transactional
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testDeleteUser() {
        ResponseEntity<Boolean> deleteResult = controller.deleteUser(69L);
        assertEquals(HttpStatus.OK, deleteResult.getStatusCode());
    }

    @Test
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testDeleteUnknownUser() throws ResourceNotFound {
        ResourceNotFound thrown = assertThrows(ResourceNotFound.class, () -> {
            controller.deleteUser(10000L);
        }, "ResourceNotFoundException was expected");

        assertEquals("no user with this id exist to be deleted", thrown.getMessage());
    }
}