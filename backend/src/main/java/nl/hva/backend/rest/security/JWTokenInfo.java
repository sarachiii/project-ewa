package nl.hva.backend.rest.security;

import java.util.Date;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
public class JWTokenInfo {

    public static final String KEY = "tokenInfo";

    private String userName;
    private boolean admin;
    private Date issuedAt;
    private Date expiration;

    public String getEmail() {
        return userName;
    }

    public void setEmail(String email) {
        this.userName = email;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    @Override
    public String toString() {
        return "JWTokenInfo{" +
                "email=" + userName +
                ", admin=" + admin +
                ", issuedAt=" + issuedAt +
                ", expiration=" + expiration +
                '}';
    }
}
