package nl.hva.backend.rest;

import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.Forbidden;
import nl.hva.backend.rest.security.JWTokenInfo;
import nl.hva.backend.rest.security.JWTokenUtils;
import nl.hva.backend.services.UserService;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
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

    @PostMapping(path = "login", produces = "application/json")
    public ResponseEntity<User> logInForAuth(@RequestBody ObjectNode LogInForm)
            throws Forbidden, ResourceNotFound{

        String email = LogInForm.get("email").asText();
        String password = LogInForm.get("password").asText();


        User user = userRepo.findByEmailAddress(email);

        if (email == null || password == null){
            throw new BadRequestException("Enter the email and the password ");
        }
        if (user==null){
            throw new ResourceNotFound("No user with this email adress");
        }
        if(!this.userService.matches(password,user.getPassword())){
            throw new Forbidden("Wrong password, try another password");
        }

        String tokenString = tokenUtils.encode(user.getEmailAddress(), user.isAdmin());
        System.out.println(tokenString);
        return ResponseEntity.accepted()
                .header(HttpHeaders.AUTHORIZATION,"Bearer " + tokenString)
                .body(user);

    }

    @PostMapping(path = "refresh-token", produces = "application/json")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(encodedToken == null) {
            // avoid giving clues to the caller (do not say that header is not present, for example)
            throw new AuthenticationException("authentication problem");
        }

        // remove the bearer initial string
        encodedToken = encodedToken.replace("Bearer ", "");

        // get a representation of the token
        JWTokenInfo tokenInfo = tokenUtils.decode(encodedToken, true);

        // refresh the token for the user
        String tokenString = tokenGenerator.encode(tokenInfo.getEmail(), tokenInfo.isAdmin());

        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).build();
    }

}
