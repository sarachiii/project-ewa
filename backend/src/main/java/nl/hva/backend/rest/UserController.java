package nl.hva.backend.rest;

import nl.hva.backend.models.forms.AccountForm;
import nl.hva.backend.models.forms.Login;
import nl.hva.backend.rest.exception.BadRequestException;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.AlreadyExist;
import nl.hva.backend.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private static final String DEFAULT_IMAGE = "image";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

    @GetMapping("users")
    public List<User> getUsersList() {
        return this.userRepository.findAll();
    }

    @GetMapping(value = "users", params = "id")
    public User getUserById(@RequestParam Long id) {
        User user = this.userRepository.findUserById(id);
        if (user == null) { throw new ResourceNotFound("No user with this id "); }
        return user;
    }

    @GetMapping(value = "users", params = "username")
    public User getUserByUsername(@RequestParam String username) {
        User user = this.userRepository.findByEmailAddress(username);
        if (user == null) { throw new ResourceNotFound("username does not exist"); }
        return user;
    }

    @PostMapping("users")
    public ResponseEntity<User> createUser(@RequestBody User u) {
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
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        if (this.userRepository.existsById(id)){
            this.userRepository.deleteById(id);
            return ResponseEntity.ok(true);
        } else {
            throw new ResourceNotFound("no user with this id exist to be deleted");
        }
    }

    @PutMapping("users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
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

    @GetMapping(
            value = "users/{id}/avatar/{filename:.+}",
            produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE }
    )
    public byte[] downloadAvatar(@PathVariable long id, @PathVariable String filename) {
        User user = getUserById(id);
        String requestedPicture = String.format("users/%d/avatar/%s", id, filename);
        if (user.getProfilePicture() == null || !user.getProfilePicture().equals(requestedPicture))
            throw new ResourceNotFound("Could not find requested resource");

        byte[] data = fileService.download(user.getProfilePicture());

        if (data == null) throw new ResourceNotFound("Could not fifnd requested resource");

        return data;
    }

    @PostMapping("users/{id}/avatar")
    public ResponseEntity<Boolean> uploadAvatar(@RequestParam MultipartFile file, @PathVariable long id)
            throws IOException {
        if (file == null) throw new BadRequestException("File is not supplied!");
        String filePrefix = String.format("users/%d/avatar/%s", id, DEFAULT_IMAGE);

        String filename = fileService.upload(file, filePrefix);

        User user = getUserById(id);

        user.setProfilePicture(filename);
        userRepository.save(user);

        return ResponseEntity.ok(true);
    }

    @PostMapping("login")
    public Long authenticateLogin(@RequestBody Login login) {
        User user = this.userRepository.findByEmailAddress(login.getUsername());

        if (user == null) { throw new ResourceNotFound("username does not exist"); }

        return login.getPassword().equals(user.getPassword()) ? user.getId() : null;
    }

}
