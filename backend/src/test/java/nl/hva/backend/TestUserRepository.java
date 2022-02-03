package nl.hva.backend;

import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@SpringBootTest
public class TestUserRepository {

    @Autowired
    private UserRepository userRepository;


    @Test
    @DirtiesContext
    void testFindUserByEmail(){
        //Arranga: set an existed user email address
        String email = "m.fuckner@ccu.org";

        //Act: find the user
        User user = userRepository.findByEmailAddress(email);

        //Assert:
        //check if the user is found by the given email address
        assertEquals(email,user.getEmailAddress());
    }

    @Test
    @DirtiesContext
    void testCreateUser(){

        //make new user
        String userEmail= "demo@gmail.com";
        User user = new User(userEmail, "user", "lastname", "thisIsPass", User.Specialty.Agronomy, User.Role.MEMBER, null, 2);


        //Act:
        //Save the new user
        this.userRepository.save(user);
        User foundUser = this.userRepository.findByEmailAddress(userEmail);


        //Assert:
        //check if the user is created
        assertNotNull(foundUser);
        assertEquals(foundUser.getEmailAddress(),user.getEmailAddress());

        //delete the created user to make sure the test is repeatable
        this.userRepository.delete(foundUser);
    }
    @Test
    @DirtiesContext
    void testUpdateUser(){

        //make new user
        String userEmail= "demo@gmail.com";
        User user = new User(userEmail, "user", "lastname", "thisIsPass", User.Specialty.Agronomy, User.Role.MEMBER, null, 2);


        //Act:
        //Save the new user
        this.userRepository.save(user);

        //get the same user by the email from the repo
        User foundUser = this.userRepository.findByEmailAddress("demo@gmail.com");
        //check if the user is stored
        assertNotNull(foundUser);

        //update the emailAddress of the created user
        user.setEmailAddress("newEmail@email.com");

        //save the user after the changes
        this.userRepository.save(user);
        User userAfterUpdate = this.userRepository.findUserById(foundUser.getId());

        //Assert:
        //check if the user is created
        assertEquals(userAfterUpdate.getEmailAddress(),"newEmail@email.com");

        //delete the created user to make sure the test is repeatable
        this.userRepository.delete(userAfterUpdate);

    }
}
