package nl.hva.backend.rest;

import nl.hva.backend.models.Team;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.TeamsRepository;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.exception.AlreadyExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("teams")
public class TeamsController {

    @Autowired
    private TeamsRepository teamsRepository;
    @Autowired
    private UserRepository userRepository;

    //Get all teams
    @GetMapping()
    public List<Team> getAllTeams() {
        return this.teamsRepository.findAll();
    }

    //Get all members from teams based on teamId
    @GetMapping("{id}")
    public List<User> getAllUsers(@PathVariable long id) {

        return this.userRepository.findUsersByTeamId(id);
    }

    @PostMapping("add")
    public ResponseEntity<Team> createTeam(@RequestBody Team t) {
        System.out.println("00000000000" + t.getGhId());
        Team savedTeam = this.teamsRepository.save(t);
        return ResponseEntity.ok().body(savedTeam);
    }
}
