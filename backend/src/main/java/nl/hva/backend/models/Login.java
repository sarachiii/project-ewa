package nl.hva.backend.models;

import com.fasterxml.jackson.annotation.JsonView;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
public class Login {
    private String username;
    private String password;

    public Login() {

    }

    public Login(String username, String password) {
        this();
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
