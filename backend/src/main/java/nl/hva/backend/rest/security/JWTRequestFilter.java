package nl.hva.backend.rest.security;

import nl.hva.backend.rest.exception.UnAuthorizedExeption;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

/**
 * Doel:
 *
 * @author Mohamad Hassan
 */
@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JWTokenUtils tokenUtils;


    // path prefixes that will be protected by the authentication filter
    private static final Set<String> SECURED_PATHS =
            Set.of("/sensors", "/notes", "/users", "/teams");

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        try {
            //get requested path
            String servletPath = request.getServletPath();

            // OPTIONS requests and non-secured area should pass through without check
            if (HttpMethod.OPTIONS.matches(request.getMethod()) || SECURED_PATHS.stream().
                    noneMatch(servletPath::startsWith)) {
                filterChain.doFilter(request, response);
                return;
            }

            JWTokenInfo jwToken;

            // get the encoded token string from the authorization request header
            String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

            if (encodedToken == null) {
                //if there is no token present in the request header
                throw new UnAuthorizedExeption("Authentication problem");
            }
            // remove the bearer initial string
            encodedToken = encodedToken.replace("Bearer ", "");

            // get a representation of the token for future usage
            jwToken = tokenUtils.decode(encodedToken, false);

            request.setAttribute(JWTokenInfo.KEY, jwToken);

            filterChain.doFilter(request, response);
        } catch (UnAuthorizedExeption | AuthenticationException e) {
            // aborting the chain
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
        }
    }
}
