package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "email", unique = true)
    private String emailAddress;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private Specialty specialty;

    @Column(name = "image_path")
    private String profilePicture;

    @Column(name = "team_id")
    private long teamId;

    @OneToOne(targetEntity = Preferences.class, mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Preferences preferences;

    @OneToMany(targetEntity = Note.class, mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user")
    private List<Note> notes = new ArrayList<>();

    @ManyToOne(targetEntity = Team.class)
    @JsonBackReference
    @JoinColumn(name = "team_id", insertable = false, updatable = false)
    private Team team;

    public enum Specialty {
        Agronomy("Agronomy"),
        Botany("Botany"),
        Geology("Geology"),
        Hydrology("Hydrology"),
        Climate_Science("Climate-Science");

        private final String STRING;

        Specialty(String string) {
            this.STRING = string;
        }

        @JsonValue
        @Override
        public String toString() {
            return this.STRING;
        }
    }

    public enum Role {
        SUPER_ADMIN("Super Admin"),
        ADMIN("Admin"),
        MEMBER("Member");

        private final String STRING;

        Role(String string) {
            this.STRING = string;
        }

        @JsonValue
        @Override
        public String toString() {
            return this.STRING;
        }
    }

    public User(String emailAddress, String firstName, String lastName, String password,
                Specialty specialty, String profilePicture, long teamId) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.specialty = specialty;
        this.profilePicture = profilePicture;
        this.teamId = teamId;
    }

    public User(String emailAddress, String password) {
        this(emailAddress, "", "", password, null, null, 0L);
    }

    public User() {
        this("", "");
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public boolean isAdmin(){
        if (this.role.toString().equals("Admin")||this.role.toString().equals("Super Admin")){
            return true;
        }
        return false;
    }


    public void setRole(Role role) {
        this.role = role;
    }

    public Specialty getSpecialty() {
        return this.specialty;
    }

    public void setSpecialty(Specialty specialty) {
        this.specialty = specialty;
    }

    public String getProfilePicture() {
        return this.profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public void setPreferences(Preferences preferences) {
        this.preferences = preferences;
    }
}
