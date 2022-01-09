package nl.hva.backend.rest.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import nl.hva.backend.models.User;
import nl.hva.backend.rest.exception.UnAuthorizedExeption;
import org.apache.tomcat.websocket.AuthenticationException;
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

    @Value("${jwt.duration-of-validity}")
    private int expiration;


    public String encode(String email, boolean isAdmin) {
        Key key = getKey(passphrase);

        return Jwts.builder()
                .claim(JWT_EMAIL_CLAIM, email)
                .claim(JWT_ADMIN_CLAIM, isAdmin)
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + (long) expiration * 10000))
                .signWith(key, SignatureAlgorithm.HS512).compact();

    }

    public JWTokenInfo decode(String token, boolean expirationLenient) throws UnAuthorizedExeption, AuthenticationException {
        try {
            Key key = getKey(passphrase);
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(passphrase.getBytes())
                    .build()
                    .parseClaimsJws(token.replace("Bearer ",""));

            Claims claims = jws.getBody();

            return generateTokenInfo(claims);
        } catch (MalformedJwtException |
                UnsupportedJwtException | IllegalArgumentException| SignatureException e) {
            throw new UnAuthorizedExeption("Authentication error");
        } catch (ExpiredJwtException e) {
            if (!expirationLenient) {
                throw new AuthenticationException(e.getMessage());
            } else {
                return generateTokenInfo(e.getClaims());
            }
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



}
