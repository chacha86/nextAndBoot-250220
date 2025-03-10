package com.example.next.standard.util;

import com.example.next.global.app.AppConfig;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class FileUtTest {

    @Test
    public void test() {
        String newFilePath = Ut.File.downloadByHttp("https://picsum.photos/id/237/200/300", AppConfig.getTempDirPath());

        // newFilePath 의 확장자가 jpg 인지 확인
        assertThat(newFilePath).endsWith(".jpg");

        Ut.File.delete(newFilePath);
    }
}
