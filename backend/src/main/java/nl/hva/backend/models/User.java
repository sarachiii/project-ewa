package nl.hva.backend.models;


import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {
    
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String firstname;
    @Column
    private String lastname;
    @Column
    private String password;
    @Column(name = "work_field")
    private String workfield;
    @Column(name = "team_leader")
    private String teamleader;

    public User() {
    }

    public User (String username,String password){
        this();
        this.username= username;
        this.password = password;
    }
    public User(String username,String email, String firstname, String lastname, String password, String workfield) {
        this();
        this.username = username;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.workfield = workfield;
    }

    // public User() {
    // this('')
    // }

    
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getWorkfield() {
        return this.workfield;
    }

    public void setWorkfield(String workfield) {
        this.workfield = workfield;
    }

    public String getTeamleader() {
        return teamleader;
    }

    public void setTeamleader(String teamleader) {
        this.teamleader = teamleader;
    }
}
