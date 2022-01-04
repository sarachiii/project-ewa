package nl.hva.backend;

import nl.hva.backend.repositories.TeamsRepository;
import nl.hva.backend.rest.TeamsController;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestTeamsController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private TeamsController controller;

    @Test
    void testDeleteUserFromTeam(){

    }

    @Test
    void testAddUserToTeam(){

    }

    @Test
    void testAddTeam(){

    }
}
