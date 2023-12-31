package nl.hva.backend.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NamedQueries({
        @NamedQuery(name = "Team_find_all", query = "SELECT t FROM Team t"),
        @NamedQuery(name = "Team_find_by_id", query = "SELECT t FROM Team t WHERE t.id = :id"),
        @NamedQuery(name = "Team_delete_by_id", query = "DELETE FROM Team t WHERE t.id = :id")
})
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "gh_id")
    private long ghId;

    @OneToMany(mappedBy = "team", targetEntity = User.class, cascade = CascadeType.REMOVE)
    private List<User> users = new ArrayList<>();

    public Team(long ghId) {
        this.ghId = ghId;
    }

    public Team() {

    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public long getGhId() {
        return ghId;
    }

    public void setGhId(long ghId) {
        this.ghId = ghId;
    }
}
