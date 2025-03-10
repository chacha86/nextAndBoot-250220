package com.example.next.standard.util;

import com.example.next.global.app.AppConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
public class FileUtTest {

    @Test
    @DisplayName("downloadByHttp")
    public void downloadByHttp() {
        String newFilePath = Ut.File.downloadByHttp("https://picsum.photos/id/237/200/300", AppConfig.getTempDirPath(), false);

        // newFilePath 의 확장자가 jpg 인지 확인
        assertThat(newFilePath).endsWith(".jpg");

        Ut.File.delete(newFilePath);
    }

    @Test
    @DisplayName("getExtensionByTika")
    void tika() {
        String newFilePath = Ut.File.downloadByHttp("https://picsum.photos/id/237/200/300", AppConfig.getTempDirPath(), false);

        String ext = Ut.File.getExtensionByTika(newFilePath);
        assertThat(ext).isEqualTo("jpg");

        Ut.File.delete(newFilePath);
    }
}
