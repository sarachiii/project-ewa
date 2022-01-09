package nl.hva.backend.rest;

import nl.hva.backend.models.Team;
import nl.hva.backend.models.User;
import nl.hva.backend.repositories.TeamsRepository;
import nl.hva.backend.repositories.UserRepository;
import nl.hva.backend.rest.exception.ResourceNotFoundException;
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

    //Get a team by the teamId
    @GetMapping("{id}")
    @ResponseBody
    public Team getTeamById(@PathVariable long id) {

        Team team = teamsRepository.findById(id);

        if (team == null)
            throw new ResourceNotFoundException("id-" + id);

        return team;
    }

    //Get all members from a team based on the teamId
    @GetMapping("/{id}/users")
    public List<User> getAllUsers(@PathVariable long id) {
        return this.userRepository.findUsersByTeamId(id);
    }

    @PostMapping()
    public ResponseEntity<Team> createTeam(@RequestBody Team t) {
        Team savedTeam = this.teamsRepository.save(t);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(savedTeam.getId()).toUri();

        return ResponseEntity.created(location).body(savedTeam);
    }

    //Get greenhouse from teams based on teamId
    @GetMapping("greenhouse/{id}")
    public Team getGreenHouseByTeamId(@PathVariable long id) {
        return this.teamsRepository.findGreenHouseByTeamId(id);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> deleteTeam(@PathVariable long id) {
        this.teamsRepository.deleteById(id);
        return ResponseEntity.ok(true);
    }
}
