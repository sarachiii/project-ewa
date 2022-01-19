package nl.hva.backend;

import nl.hva.backend.models.Note;
import nl.hva.backend.repositories.NotesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import javax.transaction.Transactional;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Nazlıcan Eren
 */

@Transactional
@SpringBootTest
public class TestNotesRepository {

    @Autowired
    private NotesRepository notesRepository;

    @Test
    void testFindingANote() {
        Note n = notesRepository.findNoteById(1);
        assertEquals("CO2 level", n.getTitle());
    }

    @Test
    @DirtiesContext
    void testRemovingANote() {
        Note n = notesRepository.findNoteById(1);
        assertNotNull(n);

        notesRepository.deleteNoteById(n.getNoteId());
        assertNull(notesRepository.findNoteById(1));
    }


    @Test
    @DirtiesContext
    void testAddingANote() {
        ZonedDateTime zonedDateTime = ZonedDateTime.of(2022, 1, 17, 13,
                5, 33, 0, ZoneId.of("UTC"));

        Note n = new Note(1, zonedDateTime, "Title of the note", "Text of the note");

        n = notesRepository.insertOrUpdateNote(n);
        assertNotEquals(0, n.getNoteId());

        n = notesRepository.findNoteById(n.getNoteId());
        assertEquals("Title of the note", n.getTitle());
    }

    @Test
    @DirtiesContext
    void testUpdatingANote() {
        Note n = notesRepository.findNoteById(5);
        assertEquals("The plants are dying", n.getNoteText());

        n.setNoteText("The text of the note is changed.");
        notesRepository.insertOrUpdateNote(n);

        n = notesRepository.findNoteById(5);
        assertEquals("The text of the note is changed.", n.getNoteText());
    }
}
