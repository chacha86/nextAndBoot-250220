package com.example.next.domain.post.post.repository;

import com.example.next.domain.member.member.entity.Member;
import com.example.next.domain.post.post.dto.PostListParamDto;
import com.example.next.domain.post.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomPostRepository {
    Page<Post> findByParam(PostListParamDto postListParamDto, Pageable pageable);
    Page<Post> findByParam(PostListParamDto postListParamDto, Member author, Pageable pageable);
}
