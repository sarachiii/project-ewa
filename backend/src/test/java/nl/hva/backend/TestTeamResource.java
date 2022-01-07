package nl.hva.backend;

//import nl.hva.backend.config.AbstractUnitTests;
import com.ctc.wstx.shaded.msv_core.util.Uri;
import nl.hva.backend.models.Team;
import nl.hva.backend.rest.TeamsController;
import nl.hva.backend.rest.security.JWTokenUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplateHandler;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestTeamResource{
    private static String STUB_EMAIL_ID = "m.fuckner@ccu.org";
    private static String STUB_PASS_ID = "MFuckner123";
    @Autowired
    private TestRestTemplate restTemplate;
    @Autowired
    private JWTokenUtils jwTokenUtils;
    @Test
    @DirtiesContext
    /**
     * @author Sarah
     */
    void testCreateTeamShouldSucceed() throws Exception {

        String pass = jwTokenUtils.getPassphrase();
        String token = jwTokenUtils.createTokenForTest("m.fuckner@ccu.org",pass);


        restTemplate.getRestTemplate().getInterceptors().add((req,body,execution)->{
            req.getHeaders().add("Authorization","Bearer "+token);
            return execution.execute(req,body);
        });

        Team team = new Team(2L);

        // Act: Creating a team
        ResponseEntity<Team> creationResult
                = restTemplate.postForEntity("/teams", team, Team.class);
        // Assert: Checking if the response is correct
        assertEquals(HttpStatus.CREATED, creationResult.getStatusCode());
        assertNotNull(creationResult.getBody().getId());
        assertEquals(team.getGhId(), creationResult.getBody().getGhId());

        // Act: Cross-check results - was the team persisted?
        ResponseEntity<Team> queryResult = restTemplate.getForEntity("/teams/" + creationResult.getBody().getId(), Team.class);

        // Assert: Check if data is correct
        assertEquals(HttpStatus.OK, queryResult.getStatusCode());
        assertEquals(queryResult.getBody().getId(), creationResult.getBody().getId());
        assertEquals(queryResult.getBody().getGhId(), creationResult.getBody().getGhId());
    }

}
