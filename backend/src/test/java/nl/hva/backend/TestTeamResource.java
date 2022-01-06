package nl.hva.backend;

import nl.hva.backend.config.TestSecurityConfig;
import nl.hva.backend.models.Team;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.net.URISyntaxException;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = TestSecurityConfig.class)
public class TestTeamResource {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testCreateTeamShouldSucceed() throws URISyntaxException {

        // Arrange
        Team team = new Team(2L);

        // Act: Creating a team
        ResponseEntity<Team> creationResult
                = this.restTemplate.postForEntity("/teams", team, Team.class);

        // Assert: Checking if the response is correct
        assertEquals(HttpStatus.CREATED, creationResult.getStatusCode());
        assertNotNull(creationResult.getBody().getId());
        assertEquals(team.getGhId(), creationResult.getBody().getGhId());

        // Act: Cross-check results - was the team persisted?
        ResponseEntity<Team> queryResult = this.restTemplate.getForEntity("/teams/" + creationResult.getBody().getId(), Team.class);

        // Assert: Check if data is correct
        assertEquals(HttpStatus.OK, queryResult.getStatusCode());
        assertEquals(queryResult.getBody().getId(), creationResult.getBody().getId());
        assertEquals(queryResult.getBody().getGhId(), creationResult.getBody().getGhId());
    }
}
