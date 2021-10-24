package nl.hva.backend.rest;

import nl.hva.backend.models.Note;
import nl.hva.backend.repositories.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This method <description of functionality>
 *
 * @author Nazlıcan Eren
 */

@RestController
@RequestMapping("note/")
public class NotesController {

    @Autowired
    private NotesRepository notesRepository;

    @GetMapping("all")
    public List<Note> getAllNotes() {
        return notesRepository.findAll();
    }

    @PostMapping("add")
    public ResponseEntity<Note> saveNote(@RequestBody Note note) {
        notesRepository.save(note);
        return ResponseEntity.ok().build();
    }

}
