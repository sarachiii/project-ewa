package nl.hva.backend.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NamedQuery(name = "Team_find_all",
        query = "SELECT t FROM Team t")
public class Team {
    @Id
    @GeneratedValue()
    private Long id;
    @Column(name = "gh_id")
    private Long ghId;

    @OneToMany(mappedBy = "team")
    private List<User> users = new ArrayList<>();

    public Team(Long ghId) {
        this.ghId = ghId;
    }

    public Team() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
