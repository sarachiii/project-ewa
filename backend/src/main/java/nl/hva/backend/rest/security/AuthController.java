package nl.hva.backend.rest.security;

import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.WrongPassword;
import nl.hva.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

    @PostMapping(path = "login", produces = "application/json")
    public ResponseEntity<User> logInForAuth(@RequestBody ObjectNode LogInForm,
                                             HttpServletRequest request,
                                             HttpServletResponse response) throws WrongPassword, ResourceNotFound{

        String email = LogInForm.get("email").asText();
        String password = LogInForm.get("password").asText();


        User user = userRepo.findByEmailAddress(email);

        if (email == null || password == null){
            throw new BadRequestException("Enter the email and the password ");
        }
        else if (user==null){
            throw new ResourceNotFound("No user with this email adress");

        }else if(!this.userService.matches(password,user.getPassword())
                /*!userRepo.findByEmailAddress(email).getPassword().equals(password)*/){
            throw new WrongPassword("Wrong password, try another password");
        }

        String tokenString = tokenUtils.encode(user.getEmailAddress(), user.isAdmin());

        return ResponseEntity.accepted()
                .header(HttpHeaders.AUTHORIZATION,"bearer " + tokenString)
                .body(user);

    }

    @PostMapping(path = "refresh-token", produces = "application/json")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(encodedToken == null) {
            // avoid giving clues to the caller (do not say that header is not present, for example)
            throw new AuthenticationException("authentication problem");
        }

        // remove the bearer initial string
        encodedToken = encodedToken.replace("Bearer ", "");

        // get a representation of the token
        JWTokenInfo tokenInfo = tokenUtils.decode(encodedToken);

        // Check if the token can be refreshed (You can also check if the user or the token was blacklisted)
        if(!tokenUtils.isRenewable(tokenInfo)) {
            throw new AuthenticationException("Token is not renewable");
        }

        // refresh the token for the user
        String tokenString = tokenGenerator.encode(tokenInfo.getEmail(), tokenInfo.isAdmin());

        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).build();
    }

}
