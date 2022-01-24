package nl.hva.backend;

import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.Note;
import nl.hva.backend.rest.NotesController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;

import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * @author Nazlıcan Eren
 */

@SpringBootTest
@Transactional
public class TestNotesController {

    @Autowired
    private NotesController notesController;

    @Test
    @DirtiesContext
    void testDeleteNote() {
        // Arrange
        // Create a note to be deleted
        Note note = new Note(1,1, ZonedDateTime.now(), "Title of the note", "Text of the note");

        // Act: add the note
        ResponseEntity<Note> addResult = notesController.saveNote(note);

        // Assert: check if adding went ok
        assertEquals(HttpStatus.OK, addResult.getStatusCode());

        // Act: delete the note
        ResponseEntity<ObjectNode> deleteResult = notesController.deleteNoteById(1);

        // Assert: check if deleting the note went successfull
        assertEquals(HttpStatus.OK, deleteResult.getStatusCode());
    }


}
