package nl.hva.backend;

import nl.hva.backend.models.User;
import nl.hva.backend.rest.UserController;
import nl.hva.backend.rest.exception.ResourceNotFound;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
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
        // Arrange: Create a user to be deleted
        User user = new User("testemail@gmail.com", "Sarah", "Buth", "1234ABC!", User.Specialty.Botany, User.Role.MEMBER, null, 1);

        // Act: add the user
        ResponseEntity<User> addResult = controller.createUser(user);

        // Assert: check if adding went ok
        assertEquals(HttpStatus.CREATED, addResult.getStatusCode());

        // Act: delete the user
        ResponseEntity<Boolean> deleteUser = controller.deleteUser(user.getId());

        // Assert: check if deleting the note went successfull
        assertEquals(HttpStatus.OK, deleteUser.getStatusCode());
    }

    @Test
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testDeleteUnknownUser() throws ResourceNotFound {

        // Arrange: Create a userId to be deleted
        long notExistingUserId = 100000L;

        // Act: Delete the user
        ResourceNotFound thrown = assertThrows(ResourceNotFound.class, () -> {
            controller.deleteUser(notExistingUserId);
        }, "ResourceNotFoundException was expected");

        // Assert: check if the correct error message appears
        assertEquals("no user with this id exist to be deleted", thrown.getMessage());
    }
}
