package nl.hva.backend.rest.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import nl.hva.backend.rest.exception.UnAuthorizedExeption;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@Component
public class JWTokenUtils {

    private static final String JWT_EMAIL_CLAIM = "Email";
    private static final String JWT_ADMIN_CLAIM = "Admin";

    @Value("${jwt.issuer:MyOrganisation}")
    private String issuer;

    @Value("${jwt.pass-phrase}")
    private String passphrase;

    @Value("${jwt.refresh-expiration-seconds}")
    private int expiration;

    @Value("${jwt.refresh-expiration-seconds}")
    private int refreshExpiration;

    public String encode(String email, boolean isAdmin) {
        Key key = getKey(passphrase);

        return Jwts.builder()
                .claim(JWT_EMAIL_CLAIM, email)
                .claim(JWT_ADMIN_CLAIM, isAdmin)
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 10000))
                .signWith(key, SignatureAlgorithm.HS512).compact();

    }

    public JWTokenInfo decode(String token) throws UnAuthorizedExeption {
        try {
            Key key = getKey(passphrase);
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(passphrase.getBytes())
                    .build()
                    .parseClaimsJws(token.replace("bearer",""));

            Claims claims = jws.getBody();

            return generateTokenInfo(claims);
        } catch (MalformedJwtException |
                UnsupportedJwtException | IllegalArgumentException| SignatureException e) {
            throw new UnAuthorizedExeption("Authentication eroor");
        }


    }

    public JWTokenInfo generateTokenInfo(Claims claims) {

        JWTokenInfo tokenInfo = new JWTokenInfo();
//        tokenInfo.setEmail(claims.get(Claims.SUBJECT).toString());
        tokenInfo.setEmail(claims.get(JWT_EMAIL_CLAIM).toString());

        String isAdminString = claims.get(JWT_ADMIN_CLAIM).toString();
        tokenInfo.setAdmin(Boolean.parseBoolean(isAdminString));

        tokenInfo.setIssuedAt(claims.getIssuedAt());
        tokenInfo.setExpiration(claims.getExpiration());

        return tokenInfo;

    }
    public static Key getKey(String passphrase) {
        byte[] hamcKey = passphrase.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(hamcKey, SignatureAlgorithm.HS512.getJcaName());
    }
    public boolean isRenewable(JWTokenInfo tokenInfo) {

        // If token is still valid there is no reason to issue a new one
        if(tokenInfo.getExpiration().compareTo(new Date()) > 0) {
            return false;
        }

        // Calculating the refresh time limit
        Calendar cal = Calendar.getInstance();
        cal.setTime(tokenInfo.getIssuedAt());
        cal.add(Calendar.SECOND,refreshExpiration);

        System.out.println("max refresh: " + cal.getTime());
        System.out.println("current date: " + new Date());

        // max refresh time should be greater than current time
        return cal.getTime().compareTo(new Date()) > 0;
    }

}
