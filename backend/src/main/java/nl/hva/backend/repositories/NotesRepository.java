package nl.hva.backend.repositories;

import nl.hva.backend.models.Note;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * This method <description of functionality>
 *
 * @author Nazlıcan Eren
 */

@Repository
public class NotesRepository {

    private List<Note> notes = new ArrayList<>();

    public Note save (Note note) {
        notes.add(note);
        return null;
    }

    public List<Note> findAll() {
        return notes;
    }

}
