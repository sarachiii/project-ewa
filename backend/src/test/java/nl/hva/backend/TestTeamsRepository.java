package nl.hva.backend;

import nl.hva.backend.repositories.TeamsRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestTeamsRepository {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private TeamsRepository repository;

    @Test
    void testFindTeams() {

    }

    @Test
    void testAddTeam(){

    }
}
