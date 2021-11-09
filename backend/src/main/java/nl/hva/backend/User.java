package nl.hva.backend;


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
    private String firstname;
    @Column
    private String lastname;
    @Column
    private String password;
    @Column
    private String workfield;


    public User() {
    }
    public User (String username,String password){
        super();
        this.username= username;
        this.password = password;
    }
    public User(String username, String firstname, String lastname, String password, String workfield) {
        super();
        this.username = username;
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

}
