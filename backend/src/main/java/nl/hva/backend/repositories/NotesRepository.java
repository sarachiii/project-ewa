package nl.hva.backend.repositories;

import nl.hva.backend.models.Note;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class NotesRepository {
    @PersistenceContext
    EntityManager entityManager;

    public List<Note> notes;

    public List<Note> findAll() {
        TypedQuery<Note> namedQuery = entityManager.createNamedQuery("find_all_notes", Note.class);
        notes = namedQuery.getResultList();
        return notes;
    }

    public Note findNoteById(int noteId) {
        return entityManager.find(Note.class, noteId);
    }

    // There is no difference between an update/insert method,
    // entityManager knows whether the note has an (existing) id or not.
    public Note insertOrUpdateNote(Note note) {
        return entityManager.merge(note);
    }

    public void deleteNote(int noteId) {
        Note note = findNoteById(noteId);
        entityManager.remove(note);
    }
}
