package nl.hva.backend.rest.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableScheduling
public class WebConfig implements WebMvcConfigurer {

    @Value("${api.url}")
    private String apiUrl;

    @Value("${ccu.api.url}")
    private String ccuApiUrl;

    @Bean
    public WebClient apiClient() {
        return WebClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Bean
    public WebClient ccuApiClient() {
        return WebClient.builder()
                .baseUrl(ccuApiUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedOrigins("http://localhost:4200", "http://localhost:8084", ccuApiUrl);
    }

    public String getCcuApiUrl() {
        return ccuApiUrl;
    }
}
