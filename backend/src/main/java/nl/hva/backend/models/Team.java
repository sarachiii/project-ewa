package nl.hva.backend.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NamedQuery(name = "Team_find_all",
        query = "SELECT t FROM Team t")
@NamedQuery(name = "Team_find_by_id",
        query = "SELECT t FROM Team t WHERE t.id = :id")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "gh_id")
    private Long ghId;

    @OneToMany(mappedBy = "team", targetEntity = User.class)
    private List<User> users = new ArrayList<>();

    public Team(Long ghId) {
        this.ghId = ghId;
    }

    public Team() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Long getGhId() {
        return ghId;
    }

    public void setGhId(Long ghId) {
        this.ghId = ghId;
    }
}
