package nl.hva.backend.services;

import com.azure.storage.blob.BlobAsyncClient;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.options.BlobParallelUploadOptions;
import nl.hva.backend.rest.config.WebConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
@Service
public class FileService {

    public static final String DEFAULT_IMAGE_NAME = "image";

    @Autowired
    private BlobClientBuilder blobClientBuilder;

    @Autowired
    private WebConfig webConfig;

    public String upload(MultipartFile file, String filePrefix) throws IOException, NullPointerException {
        if (file == null || file.getSize() == 0) return null;

        String filename = String.format("%s/%s", filePrefix, DEFAULT_IMAGE_NAME);
        BlobAsyncClient blobClient = blobClientBuilder.blobName(filename).buildAsyncClient();

        blobClient.uploadWithResponse(new BlobParallelUploadOptions(file.getInputStream())).block();

        return String.format("%s/%s/%s", blobClient.getAccountUrl(), blobClient.getContainerName(), blobClient.getBlobName());
    }

    public byte[] download(String filename) {
        if (filename == null) return null;

        BlobAsyncClient blobClient = blobClientBuilder.blobName(filename).buildAsyncClient();

        if (Boolean.FALSE.equals(blobClient.exists().block())) return null;

        return Objects.requireNonNull(blobClient.downloadContent().block()).toBytes();
    }

    public boolean delete(String filename) {
        if (filename == null) return false;

        String fileHost = webConfig.getBlobEndpoint() + webConfig.getContainerName() + "/";

        if (filename.contains(fileHost)) filename = filename.replace(fileHost, "");

        BlobClient blobClient = blobClientBuilder.blobName(filename).buildClient();

        if (!blobClient.exists()) return false;

        blobClient.delete();
        return true;
    }

    public static String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".") || filename.indexOf(".") == (filename.length() - 1)) return "";
        return filename.substring(filename.indexOf(".") + 1);
    }
}
