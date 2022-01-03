package nl.hva.backend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.hva.backend.models.Note;
import nl.hva.backend.repositories.NotesRepository;
import nl.hva.backend.rest.exception.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notes")
public class NotesController {

    @Autowired
    private NotesRepository notesRepository;

    @Autowired
    private ObjectMapper mapper;

    //Get all notes
    @GetMapping("all")
    public List<Note> getAllNotes() {
        return this.notesRepository.findAll();
    }

    //Add a note
    @PostMapping("add")
    public ResponseEntity<Note> saveNote(@RequestBody Note note) {
        if (note.noteText.length() <= 0 && note.title.length() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } else if (note.noteText.length() <= 500 && note.title.length() <= 50) {
            Note savedNote = notesRepository.insertOrUpdateNote(note);
            return ResponseEntity.ok().body(savedNote);
        } else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    //Delete a note by id from the note list
    @DeleteMapping("delete/{id}")
    public ResponseEntity<ObjectNode> deleteNoteById(@PathVariable int id) {
        if (!notesRepository.deleteNoteById(id)) throw new ResourceNotFound("id-" + id);
        ObjectNode response = mapper.createObjectNode();
        response.put("message", "Note with id " + id + " was deleted.");
        return ResponseEntity.ok(response);
    }

//    GET one note by id
//    @GetMapping("{id}")
//    public Note getNoteById(@PathVariable int id) {
//        Note note = notesRepository.findNoteById(id);
//
//        if (note == null)
//            throw new ResourceNotFoundException("id-" + id);
//
//        return note;
//    }
}
