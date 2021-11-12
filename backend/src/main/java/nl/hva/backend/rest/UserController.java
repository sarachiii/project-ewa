package nl.hva.backend.rest;

import nl.hva.backend.rest.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import nl.hva.backend.User;
import nl.hva.backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    public List<User> usersList;

    @GetMapping("login")
    public List<User> getUsersList(){
        this.usersList = this.userRepository.findAll();
        return this.userRepository.findAll();
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
}
