package nl.hva.backend.rest.config;

import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.BlobContainerClientBuilder;
import com.azure.storage.common.StorageSharedKeyCredential;
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

import java.sql.Blob;

@Configuration
@EnableScheduling
public class WebConfig implements WebMvcConfigurer {

    @Value("${allowed-origins}")
    private String[] allowedOrigins;

    // API URLs
    @Value("${api.url}")
    private String apiUrl;
    @Value("${ccu.api.url}")
    private String ccuApiUrl;

    // Spring Mail
    @Value("${spring.mail.host}")
    private String mailHost;

    // Azure Storage
    @Value("${azure.storage.account-name}")
    private String accountName;
    @Value("${azure.storage.account-key}")
    private String accountKey;
    @Value("${azure.storage.container-name}")
    private String containerName;
    @Value("${azure.storage.blob-endpoint}")
    private String blobEndpoint;
    @Value("${azure.storage.file-endpoint}")
    private String fileEndpoint;

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

    @Bean
    public BlobClientBuilder blobClientBuilder() {
        StorageSharedKeyCredential storageSharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        return new BlobClientBuilder()
                .credential(storageSharedKeyCredential)
                .endpoint(blobEndpoint)
                .containerName(containerName);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedOrigins(allowedOrigins);
    }

    public String getBlobEndpoint() {
        return this.blobEndpoint;
    }

    public String getContainerName() {
        return this.containerName;
    }

    public String getMailHost() {
        return mailHost;
    }
}
