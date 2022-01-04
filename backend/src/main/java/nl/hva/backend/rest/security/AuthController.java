package nl.hva.backend.rest.security;

import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.exception.BadGatewayException;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.WrongPassword;
import nl.hva.backend.services.UserService;
import org.hibernate.jdbc.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTokenUtils tokenGenerator;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JWTokenUtils tokenUtils;

    @PostMapping("/login")
    public ResponseEntity<Object> logInForAuth(@RequestBody ObjectNode LogInForm) throws WrongPassword,
            ResourceNotFound{

//        String email = LogInForm.get("email") == null  ? null : LogInForm.get("email").asText();
//        String givenPassword = LogInForm.get("password") == null  ? null : LogInForm.get("password").asText();

        String email = LogInForm.get("email").asText();
        String password = LogInForm.get("password").asText();
        User user = userRepo.findByEmailAddress(email);
        System.out.println(user);
/*
        User user = new User();
        user.setEmailAddress(email);
        user.set(name);
        user.setEncodedPassword(encoder.encode(givenPassword));
        user.setAdmin(true);
*/
        if (email == null || password == null){
            throw new BadRequestException("Enter the email and the password ");
        }
        else if (user==null){
            throw new ResourceNotFound("No user with this email adress");

        }else if(!this.userService.matches(password,user.getPassword())
                /*!userRepo.findByEmailAddress(email).getPassword().equals(password)*/){
            throw new WrongPassword("Wrong password, try another password");
        }

        String tokenString = tokenGenerator.encode(user.getEmailAddress(), user.isAdmin());

/*        URI location = ServletUriComponentsBuilder.
                fromCurrentRequest().path("/{id}").
                buildAndExpand(user.getEmailAddress()).toUri();*/

//        return ResponseEntity.created(location).build();
        return ResponseEntity.accepted()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
                .body(user);

    }

}
