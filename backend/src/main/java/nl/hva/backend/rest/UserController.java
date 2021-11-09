package nl.hva.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
//    @GetMapping("login")
//    public ResponseEntity<User> getUser(@RequestBody User user){
//        if (user!=null){
//        User user1 = this.userRepository.getById((long)1)    ;
//        return ResponseEntity.ok(user1);
//        }
//        return null;
//    }

}
