package nl.hva.backend;

import nl.hva.backend.models.Team;
import nl.hva.backend.repositories.TeamsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Sarah Chrzanowska-Buth, Hashim Mohammad
 */
@SpringBootTest
public class TestTeamsRepository {

    @Autowired
    private TeamsRepository repository;

    @Test
    @DirtiesContext
    @Transactional
    /**
     * @author Sarah
     */
    void testFindTeamById() {

        // Arrange: create team
        Team team = new Team(2L);
        team = repository.save(team);

        // Act: search the team by id
        Team t = repository.findById(team.getId());

        // Assert
        assertEquals(team.getId(), t.getId()); //team id should equal t id
        assertEquals(2L, t.getGhId()); //greenhouse id (ghId) should equal 2
    }

    @Test
    @DirtiesContext
    @Transactional
    /**
     * @author Sarah
     */
    void testAddTeam() {

        // Arrange: create team
        Team t = new Team(2L);

        // Act: save the team
        t = repository.save(t);

        // Assert: assert that the team is created
        assertNotNull(t);

        // Act: find the team
        t = repository.findById(t.getId());

        // Assert: that the team id equals 2
        assertEquals(2L, t.getGhId());
    }


    /**
     * @author Hashim Mohammad
     */
    @Test
    @DirtiesContext
    void testDeleteTeam() {
        // Arrange
        Team team = new Team(2L);
        team = repository.save(team);

        // Act
        team = repository.findById(team.getId());

        // Assert
        assertNotNull(team); // Team should exist

        // Act
        long teamId = team.getId();
        repository.deleteById(teamId);

        // Assert
        assertNull(repository.findById(teamId)); // Assert that the team no longer exists
    }
}
