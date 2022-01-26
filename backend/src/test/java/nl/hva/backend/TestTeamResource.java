package nl.hva.backend;

import nl.hva.backend.models.Team;
import nl.hva.backend.rest.security.JWTokenUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @author Sarah Chrzanowska-Buth, Hashim Mohammad
 */
@TestConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestTeamResource {

    private static final String STUB_EMAIL_ID = "m.fuckner@ccu.org";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JWTokenUtils jwTokenUtils;

    @BeforeEach
    @DirtiesContext
    void setUp() {
        String token = jwTokenUtils.encode(STUB_EMAIL_ID,false);

        restTemplate.getRestTemplate().getInterceptors().add((req, body, execution) -> {
            req.getHeaders().add("Authorization","Bearer " + token);
            return execution.execute(req, body);
        });
    }

    /**
     * @author Sarah Chrzanowska-Buth
     */
    @Test
    @DirtiesContext
    @Transactional
    void testCreateTeamShouldSucceed() {
        // Arrange: Create a new team
        Team team = new Team(2L);

        // Act: Post the new team
        ResponseEntity<Team> creationResult = restTemplate.postForEntity("/teams", team, Team.class);

        // Assert: Checking if the response is correct
        assertEquals(HttpStatus.CREATED, creationResult.getStatusCode());
        assertNotNull(creationResult.getBody().getId());
        assertEquals(team.getGhId(), creationResult.getBody().getGhId());

        // Act: Cross-check results - was the team persisted?
        ResponseEntity<Team> queryResult = restTemplate.getForEntity("/teams/" + creationResult.getBody().getId(), Team.class);

        // Assert: Check if data of the team is correct
        assertEquals(HttpStatus.OK, queryResult.getStatusCode());
        assertEquals(queryResult.getBody().getId(), creationResult.getBody().getId());
        assertEquals(queryResult.getBody().getGhId(), creationResult.getBody().getGhId());
    }

    /**
     * @author Hashim Mohammad
     */
    @Test
    @DirtiesContext
    @Transactional
    void testDeleteTeamShouldSucceed() {
        // Arrange: Create new team and get the id
        Team team = new Team(2L);
        ResponseEntity<Team> creationResult = restTemplate.postForEntity("/teams", team, Team.class);
        assertEquals(HttpStatus.CREATED, creationResult.getStatusCode());
        long teamId = Objects.requireNonNull(creationResult.getBody()).getId();

        // Act: Delete team
        restTemplate.delete("/teams/" + teamId);

        // Assert: Team with id teamId should no longer exist
        ResponseEntity<Team> deletionResult = restTemplate.getForEntity("/teams/" + teamId, Team.class);
        assertEquals(HttpStatus.NOT_FOUND, deletionResult.getStatusCode());
    }
}
