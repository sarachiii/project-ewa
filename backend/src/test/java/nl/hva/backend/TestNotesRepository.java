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

    @Autowired // repository is automatically injected into the test instance
    private NotesRepository notesRepository;

    ZonedDateTime zonedDateTime;

    @Test
    void testFindingANote() {
        long noteId = 1;
        Note n = notesRepository.findNoteById(noteId);
        assertEquals("CO2 level", n.getTitle());
    }

    @Test
    @DirtiesContext
    void testRemovingANoteShouldSucceed() {
        // Arrange
        long noteId = 1;
        zonedDateTime = ZonedDateTime.of(2022, 1, 17, 13,
                5, 33, 0, ZoneId.of("UTC"));
        Note n = new Note(noteId, 1, zonedDateTime, "Title of the note", "Text of the note");

        // Act
        n = notesRepository.insertOrUpdateNote(n); // adds the note
        n = notesRepository.findNoteById(noteId); // gets the note

        // Assert
        assertNotNull(n); // note should exist

        // Act
        boolean isDeleted = notesRepository.deleteNoteById(n.getNoteId());

        // Assert
        assertTrue(isDeleted);
        assertNull(notesRepository.findNoteById(noteId)); // checks if the note no longer exists
    }

    @Test
    @DirtiesContext
    void testRemovingAnUnknownNote() {
        long noteId = 1234567890; // a note with this id does not exist

        Note n = notesRepository.findNoteById(noteId);

        assertNull(n);

        boolean isDeleted = notesRepository.deleteNoteById(noteId);

        assertFalse(isDeleted);
    }

    @Test
    @DirtiesContext
    void testAddingANote() {
        zonedDateTime = ZonedDateTime.of(2022, 1, 17, 13,
                5, 33, 0, ZoneId.of("UTC"));
        Note n = new Note(1, zonedDateTime, "Title of the note", "Text of the note");

        n = notesRepository.insertOrUpdateNote(n); // adds the note
        assertNotEquals(0, n.getNoteId()); // checks if note id is not 0

        n = notesRepository.findNoteById(n.getNoteId());
        assertEquals("Title of the note", n.getTitle());
    }

    @Test
    @DirtiesContext
    void testUpdatingANote() {
        zonedDateTime = ZonedDateTime.of(2022, 1, 17, 13,
                5, 33, 0, ZoneId.of("UTC"));
        Note n = new Note(5, 1, zonedDateTime, "Dehydration", "The plants are dying");

        n = notesRepository.insertOrUpdateNote(n); // adds the note
        n = notesRepository.findNoteById(5); // finds the note

        assertEquals("The plants are dying", n.getNoteText());

        n.setNoteText("The text of the note is changed.");
        notesRepository.insertOrUpdateNote(n);

        n = notesRepository.findNoteById(5);
        assertEquals("The text of the note is changed.", n.getNoteText());
    }
}
