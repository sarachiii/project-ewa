package nl.hva.backend;

import nl.hva.backend.models.Team;
import nl.hva.backend.rest.security.JWTokenUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import static org.junit.jupiter.api.Assertions.*;
/**
 * @author Sarah Chrzanowska-Buth
 */
@TestConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestTeamResource {

    private static final String STUB_EMAIL_ID = "m.fuckner@ccu.org";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JWTokenUtils jwTokenUtils;

    @Test
    @DirtiesContext
    void testCreateTeamShouldSucceed() {

        String pass = jwTokenUtils.getPassphrase();
        String token = jwTokenUtils.createTokenForTest(STUB_EMAIL_ID, pass);

        restTemplate.getRestTemplate().getInterceptors().add((req, body, execution) -> {
            req.getHeaders().add("Authorization","Bearer " + token);
            return execution.execute(req, body);
        });

        // Arrange: Create a new team
        Team team = new Team(2L);

        // Act: Post the new team
        ResponseEntity<Team> creationResult
                = restTemplate.postForEntity("/teams", team, Team.class);

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
}
