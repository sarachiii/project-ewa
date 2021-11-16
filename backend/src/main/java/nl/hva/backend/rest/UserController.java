package nl.hva.backend.rest;

import ch.qos.logback.core.joran.event.BodyEvent;
import nl.hva.backend.model.Login;
import nl.hva.backend.rest.exception.ResourceNotFound;
import nl.hva.backend.rest.exception.alreadyExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import nl.hva.backend.User;
import nl.hva.backend.repository.UserRepository;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List<User> getUsersList(){
        return this.userRepository.findAll();
    }
    @GetMapping("users/{id}")
    public User getUsersById(@PathVariable Long id){
        User user = this.userRepository.findUserById(id);
        if (user == null) {
            throw new ResourceNotFound("No user with this id ");
        }
        return this.userRepository.findUserById(id);
    }

    @PostMapping("users")
    public ResponseEntity<User> createUser(@RequestBody User u){
       boolean check = false;
       for (User user :userRepository.findAll()) {
           if (user.getUsername().equals(u.getUsername())) {
               check = true;
               break;
           }
        }
       if(!check){
           User saveUser = userRepository.save(u);
           URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(saveUser.getId()).toUri();
           return ResponseEntity.created(location).body(saveUser);
       }else {
           throw new alreadyExist("the user is already in the database");
       }
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id){
        if (this.userRepository.existsById(id)){
            this.userRepository.deleteById(id);
            return ResponseEntity.ok(true);
        }else {
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
        }else {
            throw new ResourceNotFound("there is no user with this id");
        }

    }
    @GetMapping("login/{username}")
    public User getUserByUsername(@PathVariable String username){
        User user =this.userRepository.findByUsername(username);
        if (user==null){throw new ResourceNotFound("username does not exist");}
        return user;
    }

    @PostMapping("login")
    public Boolean getUserByUsername(@RequestBody Login login){
        User user =this.userRepository.findByUsername(login.getUsername());

        if (user==null){
            throw new ResourceNotFound("username does not exist");}

        return login.getPassword().equals(user.getPassword());
//        return login.getPassword().equals(user.getPassword());
    }
}
