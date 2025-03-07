package com.example.next.domain.post.post.repository;

import com.example.next.domain.post.post.dto.PostListParamDto;
import com.example.next.domain.post.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomPostRepository {
    Page<Post> findByParam(PostListParamDto postListParamDto, Pageable pageable);
}
