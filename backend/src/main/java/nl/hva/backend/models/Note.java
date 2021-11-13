package nl.hva.backend.models;

import javax.persistence.*;
import java.sql.Date;

//@Table(name = "note")
@Entity
@NamedQuery(name = "find_all_notes", query = "select n from Note n")
public class Note {

    @Id
    @GeneratedValue
    @Column(name = "note_id")
    public int noteId;
    public Date timestamp;
    public String title;
    @Column(name = "note_text")
    public String noteText;
    public String workfield;
    @Column(name = "user_id")
    public int userId;


    public Note(int noteId, int userId, String workfield, Date timestamp, String title, String noteText) {
        super();
        this.noteId = noteId;
        this.workfield = workfield;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    public Note(int userId, String workfield, Date timestamp, String title, String noteText) {
        super();
        this.workfield = workfield;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    public Note() {
    }

    @Override
    public String toString() {
        return "\nNote [noteId=" + noteId + ", timestamp=" + timestamp + ", title='" + title +
                ", noteText='" + noteText + ", workfield='" + workfield + ", userId=" + userId + ']';
    }
}
