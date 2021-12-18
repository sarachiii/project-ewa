package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@NamedQuery(name = "find_all_notes", query = "select n from Note n")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @GeneratedValue
    @Column(name = "id")
    public int noteId;
    @Column(name ="user_id")
    public int userId;
//    public String workfield;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public ZonedDateTime timestamp;
    public String title;
    @Column(name = "content")
    public String noteText;
//    public String username;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @JsonManagedReference
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    public User user;

    public Note(int noteId, int userId, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.noteId = noteId;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    public Note(int userId, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

//    public Note(ZonedDateTime timestamp, String title, String noteText) {
//        super();
//        this.timestamp = timestamp;
//        this.title = title;
//        this.noteText = noteText;
//    }

    protected Note() {
    }

//    public int getNoteId() {
//        return noteId;
//    }

    @Override
    public String toString() {
        return "\n" + noteId  + ", " + timestamp + ", " + title + ", " + noteText + ", " + userId;
    }
}
