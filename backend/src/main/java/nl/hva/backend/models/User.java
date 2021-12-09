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
    @Column(name = "email")
    private String emailAddress;
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    private String password;
    @Column(name = "work_field")
    private String specialty;
    @Column(name = "image_path")
    private String profilePicture;
    @Column(name = "team_id")
    private Long teamId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Preferences preferences;

    public enum Specialty {
        A("Agronomy"),
        B("Botany"),
        G("Geology"),
        H("Hydrology"),
        CS("Climate-Science");

        private final String string;

        Specialty(String string) {
            this.string = string;
        }

        @Override
        public String toString() {
            return this.string;
        }
    }

    public User() {
    }

    public User (String emailAddress, String password) {
        this();
        this.emailAddress = emailAddress;
        this.password = password;
    }
    public User (String emailAddress, String firstName, String lastName, String password,
                String specialty, String profilePicture, Long teamId) {
        this();
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.specialty = specialty;
        this.profilePicture = profilePicture;
        this.teamId = teamId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
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

    public String getSpecialty() {
        return Specialty.valueOf(this.specialty).toString();
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getProfilePicture() {
        return this.profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}
