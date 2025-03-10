package com.example.next.domain.post.genFile.entity;

import com.example.next.domain.post.post.entity.Post;
import com.example.next.global.app.AppConfig;
import com.example.next.global.entity.BaseTime;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PostGenFile extends BaseTime {
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    private String typeCode;
    private String filePath;
    private String originalFileName;
    private String fileExt;
    private String fileName;
    private long fileSize;

    public String getFilePath() {
        return AppConfig.getGenFileDirPath() + "/post/" + fileName;
    }
}
