package nl.hva.backend.rest.security;

import nl.hva.backend.rest.exception.UnAuthorizedExeption;
import org.apache.tomcat.websocket.AuthenticationException;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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
public class JWTRequerstFilter extends OncePerRequestFilter {

    @Autowired
    private JWTokenUtils tokenUtils;



    private static final Set<String> SECURED_PATHS =
            Set.of(/*"blala","kasldfj"*/"/sensors", "/notes", "/users", "/teams");

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException {

        String servletPath = request.getServletPath();

        if (HttpMethod.OPTIONS.matches(request.getMethod()) || SECURED_PATHS.stream().
                noneMatch(servletPath::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }
        JWTokenInfo jwToken;
        try {


            String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (encodedToken == null){
                throw new UnAuthorizedExeption("Authentication problem");
            }

            encodedToken = encodedToken.replace("Bearer "," ");

            jwToken= tokenUtils.decode(encodedToken,false);

            request.setAttribute(JWTokenInfo.KEY, jwToken);

            filterChain.doFilter(request, response);
        }catch(UnAuthorizedExeption | AuthenticationException e ) {
            // aborting the chain
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");

        }
    }
}
