package nl.hva.backend;

import nl.hva.backend.models.Team;
import nl.hva.backend.repositories.TeamsRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TestTeamsRepository {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TeamsRepository repository;

    @Test
    /**
     * @author Sarah
     */
    void testFindTeams() {
        Team t = repository.findById(1L);
        assertEquals(1L, t.getId());
        assertEquals(2L, t.getGhId());
    }

    @Test
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testAddTeam() {
        Team t = new Team(2L); //Arrange

        t = repository.save(t); //Act

        assertNotNull(t.getId()); //Assert

        t = repository.findById(t.getId()); //Act

        assertEquals(2L, t.getGhId()); //Assert
    }
}
