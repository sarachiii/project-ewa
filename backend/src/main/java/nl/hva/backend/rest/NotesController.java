package nl.hva.backend.rest;

import nl.hva.backend.models.Note;
import nl.hva.backend.repositories.NotesRepository;
import nl.hva.backend.rest.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("notes")
public class NotesController {

    @Autowired
    private NotesRepository notesRepository;


    //Get all notes
    @GetMapping("all")
    public List<Note> getAllNotes() {
        return this.notesRepository.findAll();
    }

    //Add a note
    @PostMapping("add")
    public ResponseEntity<Note> saveNote(@RequestBody Note note) {
        notesRepository.insertOrUpdateNote(note);
//        Note savedNote = notesRepository.insertOrUpdateNote(note);
//
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentRequest()
//                .path("/{id}")
//                .buildAndExpand(savedNote.getNoteId()).toUri();
//        return ResponseEntity.created(location).body(savedNote);
        return ResponseEntity.ok().build();
    }

    //GET one note by id
//    @GetMapping("{id}")
//    @ResponseBody
//    public Note getScooterById(@PathVariable int id) {
//        Note note = notesRepository.findNoteById(id);
//
//        if (note == null)
//            throw new ResourceNotFoundException("id-" + id);
//
//        return note;
//    }
}
