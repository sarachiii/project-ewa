package nl.hva.backend.models.forms;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
public class Login {
    private String email;
    private String password;

    public Login() {

    }

    public Login(String email, String password) {
        this();
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return String.format("this is the email : (%s), and this is the password:(%s) ",this.email,this.password);
    }
}
