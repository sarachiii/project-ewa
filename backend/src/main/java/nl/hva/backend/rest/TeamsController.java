package nl.hva.backend.rest;

import nl.hva.backend.models.Team;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.TeamsRepository;
import nl.hva.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
