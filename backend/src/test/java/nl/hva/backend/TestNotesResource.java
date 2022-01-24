package nl.hva.backend;

import nl.hva.backend.models.Note;
import nl.hva.backend.rest.security.JWTokenUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Nazlıcan Eren
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestNotesResource {

    private static final String STUB_EMAIL_ID = "sjors.peters@climatecleanup.org";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JWTokenUtils jwTokenUtils;

    @Test
    void testCreatingNoteShouldSucceed() {
        String token = jwTokenUtils.encode(STUB_EMAIL_ID, false);
        restTemplate.getRestTemplate().getInterceptors().add((req, body, execution) -> {
            req.getHeaders().add("Authorization", "Bearer " + token);
            return execution.execute(req, body);
        });

        // Arrange
        ZonedDateTime zonedDateTime = ZonedDateTime.of(2022, 1, 17, 13,
                5, 33, 0, ZoneId.of("UTC"));
        Note note = new Note(1, zonedDateTime, "Title of the note", "Text of the note");

        // Act: Creating a note
        ResponseEntity<Note> creationResult
                = this.restTemplate.postForEntity("/notes", note, Note.class);

        // Assert: Checking if the response is correct
        assertEquals(HttpStatus.OK, creationResult.getStatusCode());

        assertNotEquals(0, creationResult.getBody().getNoteId());

        assertEquals(note.getUserId(), creationResult.getBody().getUserId());
        assertEquals(note.getTimestamp(), creationResult.getBody().getTimestamp());
        assertEquals(note.getTitle(), creationResult.getBody().getTitle());
        assertEquals(note.getNoteText(), creationResult.getBody().getNoteText());

        // Act: Cross-check results - was the note persisted?
        ResponseEntity<Note> queryResult = this.restTemplate.getForEntity("/notes/" +
                creationResult.getBody().getNoteId(), Note.class);

        // Assert: Check if data is correct
        assertEquals(HttpStatus.OK, queryResult.getStatusCode());
        assertEquals(queryResult.getBody().getUserId(), creationResult.getBody().getUserId());
        assertEquals(queryResult.getBody().getTimestamp(), creationResult.getBody().getTimestamp());
        assertEquals(queryResult.getBody().getTitle(), creationResult.getBody().getTitle());
        assertEquals(queryResult.getBody().getNoteText(), creationResult.getBody().getNoteText());
    }
}
