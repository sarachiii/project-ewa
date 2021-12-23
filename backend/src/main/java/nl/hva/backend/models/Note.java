package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.*;
import jdk.jfr.TransitionTo;
import org.hibernate.annotations.FilterJoinTable;
import org.springframework.web.bind.annotation.RequestMapping;

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
    //    public String workfield;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    public ZonedDateTime timestamp;
    public String title;
    @Column(name = "content")
    public String noteText;
//    public String username;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonManagedReference
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private User user2;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "user_id")
    public Long userId;

    protected Note() {
    }

    public Note(int noteId, User user, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.noteId = noteId;
        this.user2 = user;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    public Note(int noteId, Long userId, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.noteId = noteId;
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }



    public Note(Long userId, ZonedDateTime timestamp, String title, String noteText) {
        super();
        this.userId = userId;
        this.timestamp = timestamp;
        this.title = title;
        this.noteText = noteText;
    }

    @Override
    public String toString() {
        return "\n" + noteId + ", " + timestamp + ", " + title + ", " + noteText + ", ";
    }
}
