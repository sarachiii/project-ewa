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

    public List<User> usersList;


    @GetMapping("users")
    public List<User> getUsersList(){
        this.usersList = this.userRepository.findAll();
        return this.userRepository.findAll();
    }
    @GetMapping("users/{id}")
    public User getUsersList(@PathVariable Long id){
        return this.userRepository.findUserById(id);
    }
    @PostMapping("users")
    public ResponseEntity<User> createUser(@RequestBody User u){
       boolean check = false;
       for (User user :userRepository.findAll()) {
            if (user.getUsername().equals(u.getUsername())){
                check = true;
            }
        }
       if(!check){
           User saveUser = userRepository.save(u);
           URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(saveUser.getId()).toUri();
//           return ResponseEntity.ok().build();
           return ResponseEntity.created(location).body(saveUser);
       }else {
           throw new alreadyExist("the user is already in the database");
       }
    }



/*    @GetMapping("login/{id}")
    public Optional<User> getUserById(@PathVariable Long id){
        Optional<User> user =this.userRepository.findById(id);

        if (user.isPresent()){
            return user;
        }else {
            //TODO
            // throw exception not found if user not exist instate of returning null
            return null;
        }
    }*/
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
