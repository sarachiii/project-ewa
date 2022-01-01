package nl.hva.backend.services;

import com.azure.core.http.rest.Response;
import com.azure.core.util.Context;
import com.azure.storage.blob.BlobAsyncClient;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobClientBuilder;
import com.azure.storage.blob.models.BlobRequestConditions;
import com.azure.storage.blob.models.BlockBlobItem;
import com.azure.storage.blob.options.BlobParallelUploadOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.Objects;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
@Service
public class FileService {

    @Autowired
    private BlobClientBuilder blobClientBuilder;

    public String upload(MultipartFile file, String filePrefix) throws IOException, NullPointerException {
        if (file == null || file.getSize() == 0) return null;

        String filename = String.format("%s.%s", filePrefix, getFileExtension(file.getOriginalFilename()));
        BlobAsyncClient blobClient = blobClientBuilder.blobName(filename).buildAsyncClient();

        blobClient.uploadWithResponse(new BlobParallelUploadOptions(file.getInputStream())).block();

        return filename;
    }

    public byte[] download(String filename) {
        if (filename == null) return null;

        BlobClient blobClient = blobClientBuilder.blobName(filename).buildClient();

        if (!blobClient.exists()) return null;

        return blobClient.downloadContent().toBytes();
    }

    public boolean delete(String filename) {
        if (filename == null) return false;

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
