package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@NamedQuery(name = "find_all_notes", query = "select n from Note n")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long noteId;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private ZonedDateTime timestamp;
    private String title;
    @Column(name = "content")
    private String noteText;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonManagedReference
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private User user;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "user_id")
    private long userId;

    protected Note() {
    }

    public Note(int noteId, User user, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.noteId = noteId;
        this.user = user;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    public Note(int noteId, long userId, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.noteId = noteId;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    public Note(long userId, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    @Override
    public String toString() {
        return "\n" + noteId + ", " + timestamp + ", " + title + ", " + noteText;
    }

    public String getTitle() {
        return title;
    }

    public String getNoteText() {
        return noteText;
    }

    public long getNoteId() {
        return noteId;
    }

    public void setNoteId(long noteId) {
        this.noteId = noteId;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setNoteText(String noteText) {
        this.noteText = noteText;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
