package nl.hva.backend.rest;

import nl.hva.backend.models.forms.AccountForm;
import nl.hva.backend.models.forms.Login;
import nl.hva.backend.rest.exception.*;
import nl.hva.backend.services.EmailService;
import nl.hva.backend.services.FileService;
import nl.hva.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import nl.hva.backend.models.User;
import nl.hva.backend.repositories.UserRepository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.UnsupportedMediaTypeException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@RestController
public class UserController {

    private static final String DEFAULT_IMAGE_NAME = "image";
    private static final List<String> IMAGE_MEDIA_TYPES = new ArrayList<>(
            Arrays.asList(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE)
    );

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private FileService fileService;

    @GetMapping("users")
    public List<User> getUsersList() {
        return this.userRepository.findAll();
    }

    @GetMapping(value = "users", params = "id")
    public User getUserById(@RequestParam Long id) {
        User user = this.userRepository.findUserById(id);
        if (user == null) {
            throw new ResourceNotFound("No user with this id ");
        }
        return user;
    }

    @GetMapping(value = "users", params = "username")
    public User getUserByUsername(@RequestParam String username) {
        User user = this.userRepository.findByEmailAddress(username);
        if (user == null) {
            throw new ResourceNotFound("username does not exist");
        }
        return user;
    }

    @PostMapping("users")
    public ResponseEntity<User> createUser(@RequestBody User user)
            throws ConflictException, BadGatewayException, InternalServerErrorException {
        User u = this.userRepository.findByEmailAddress(user.getEmailAddress());

        if (u != null) {
            throw new ConflictException("The user already exists in the database");
        }

        // Generate random password
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            user.setPassword(userService.generateRandomPassword());
        }

        HashMap<String, String> mail = userService.generateMail(user);

        user.setPassword(this.userService.encode(user.getPassword()));

        User savedUser = this.userRepository.save(user);
        this.userRepository.flush();

        emailService.sendMimeMessage(mail.get("recipient"), mail.get("subject"), mail.get("body"));

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        if (this.userRepository.existsById(id)) {
            this.userRepository.deleteById(id);
            return ResponseEntity.ok(true);
        } else {
            throw new ResourceNotFound("no user with this id exist to be deleted");
        }
    }

    @PutMapping("users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User userToUpdate = this.userRepository.findUserById(id);
        if (this.userRepository.existsById(id)) {
            user.setId(id);
            this.userRepository.save(user);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("{id}")
                    .buildAndExpand(userToUpdate.getId())
                    .toUri();
            return ResponseEntity.created(location).body(userToUpdate);
        } else {
            throw new ResourceNotFound("there is no user with this id");
        }
    }

    @PutMapping(value = "users/{id}/account", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> updateUser(@PathVariable Long id,
                                              @RequestPart @Valid AccountForm accountForm,
                                              @RequestParam(required = false) MultipartFile file) throws IOException {
        User user = this.userRepository.findUserById(id);

        if (!this.userService.matches(accountForm.getPassword(), user.getPassword())) {
            throw new BadRequestException("Password is wrong");
        }

        // Set new values
        user.setFirstName(accountForm.getFirstName());
        user.setLastName(accountForm.getLastName());
        user.setEmailAddress(accountForm.getEmailAddress());

        // Change password if new password is supplied
        if (!accountForm.getNewPasswordForm().getPassword().isBlank()) {
            String hashedPassword = this.userService.encode(accountForm.getNewPasswordForm().getPassword());
            user.setPassword(hashedPassword);
        }

        // Delete profile picture
        if (user.getProfilePicture() != null && accountForm.getDeleteProfilePicture()) {
            fileService.delete(user.getProfilePicture());
            user.setProfilePicture(null);
        }

        // Set profile picture
        if (file != null && file.getSize() > 0) {
            // If media type is not jpeg or png return error
            if (!IMAGE_MEDIA_TYPES.contains(file.getContentType())) {
                throw new UnsupportedMediaTypeException(
                        String.format("File type is not supported. Supports: %s", IMAGE_MEDIA_TYPES.toArray())
                );
            }

            if (user.getProfilePicture() != null) fileService.delete(user.getProfilePicture());

            String filePrefix = String.format("users/%d/avatar/%s", id, DEFAULT_IMAGE_NAME);
            String fileUrl = fileService.upload(file, filePrefix);
            user.setProfilePicture(fileUrl);
        }

        this.userRepository.save(user);

        return ResponseEntity.ok(true);
    }

    @PostMapping("login")
    public Long authenticateLogin(@RequestBody Login login) {
        User user = this.userRepository.findByEmailAddress(login.getUsername());

        if (user == null) {
            throw new ResourceNotFound("username does not exist");
        }

        return this.userService.matches(login.getPassword(), user.getPassword()) ? user.getId() : null;
    }

}
