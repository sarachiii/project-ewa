package nl.hva.backend.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NamedQuery(name = "find_all_notes", query = "select n from Note n")
public class Note {

    @Id
    @GeneratedValue
    @Column(name = "note_id")
    public int noteId;
    @Column(name = "user_id")
    public int userId;
    public String workfield;
    public LocalDateTime timestamp;
    public String title;
    @Column(name = "note_text")
    public String noteText;
    public String username;

    public Note(int noteId, int userId, String workfield, LocalDateTime timestamp, String title, String noteText, String username) {
        super();
        this.noteId = noteId;
        this.workfield = workfield;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
        this.username = username;
    }

    public Note(int userId, String workfield, LocalDateTime timestamp, String title, String noteText, String username) {
        super();
        this.workfield = workfield;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
        this.username = username;
    }

    public Note() {
    }

    public int getNoteId() {
        return noteId;
    }

    @Override
    public String toString() {
        return "\n" + noteId + ", " + userId + ", " + workfield + ", " + timestamp + ", " + title + ", " + noteText + ", " + username;
    }
}
