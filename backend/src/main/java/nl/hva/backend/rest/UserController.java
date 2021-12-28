package nl.hva.backend.rest;

import nl.hva.backend.models.forms.AccountForm;
import nl.hva.backend.models.forms.Login;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.AlreadyExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List<User> getUsersList(){
        return this.userRepository.findAll();
    }

    @GetMapping(value = "users", params = "id")
    public User getUserById(@RequestParam Long id){
        User user = this.userRepository.findUserById(id);
        if (user == null) { throw new ResourceNotFound("No user with this id "); }
        return user;
    }

    @GetMapping(value = "users", params = "username")
    public User getUserByUsername(@RequestParam String username){
        User user = this.userRepository.findByEmailAddress(username);
        if (user == null) { throw new ResourceNotFound("username does not exist"); }
        return user;
    }

    @PostMapping("users")
    public ResponseEntity<User> createUser(@RequestBody User u){
       boolean check = false;
       for (User user : this.userRepository.findAll()) {
           if (user.getEmailAddress().equals(u.getEmailAddress())) {
               check = true;
               break;
           }
        }
       if (!check) {
           User saveUser = this.userRepository.save(u);
           URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(saveUser.getId()).toUri();
           return ResponseEntity.created(location).body(saveUser);
       } else {
           throw new AlreadyExist("the user is already in the database");
       }
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id){
        if (this.userRepository.existsById(id)){
            this.userRepository.deleteById(id);
            return ResponseEntity.ok(true);
        } else {
            throw new ResourceNotFound("no user with this id exist to be deleted");
        }
    }

    @PutMapping("users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user){
        User userToUpdate = this.userRepository.findUserById(id);
        if (this.userRepository.existsById(id)){
            user.setId(id);
            this.userRepository.save(user);
            URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(userToUpdate.getId()).toUri();
            return ResponseEntity.created(location).body(userToUpdate);
        } else {
            throw new ResourceNotFound("there is no user with this id");
        }
    }

    @PutMapping("users/{id}/account")
    public ResponseEntity<Boolean> updateUser(@PathVariable Long id, @Valid @RequestBody AccountForm accountForm) {
        User user = this.userRepository.findUserById(id);

        if (!user.getPassword().equals(accountForm.getPassword())) {
            throw new BadRequestException("Password is wrong");
        }

        user.setFirstName(accountForm.getFirstName());
        user.setLastName(accountForm.getLastName());
        user.setEmailAddress(accountForm.getEmailAddress());

        if (!accountForm.getNewPasswordForm().getPassword().isBlank()) {
            user.setPassword(accountForm.getNewPasswordForm().getPassword());
        }

        // Set URL path to profilePicture if supplied
        if (!accountForm.getPictureForm().getFile().isBlank()) {
            // File upload then get URL
            user.setProfilePicture(accountForm.getPictureForm().getFile());
        } else if (!accountForm.getPictureForm().getUrl().isBlank()) {
            user.setProfilePicture(accountForm.getPictureForm().getUrl());
        } else if (accountForm.getDeleteProfilePicture()) {
            user.setProfilePicture(null);
        }

        this.userRepository.save(user);

        return ResponseEntity.ok(true);
    }

    @PostMapping("login")
    public Long authenticateLogin(@RequestBody Login login){
        User user = this.userRepository.findByEmailAddress(login.getUsername());

        if (user == null) { throw new ResourceNotFound("username does not exist"); }

        return login.getPassword().equals(user.getPassword()) ? user.getId() : null;
    }
}
