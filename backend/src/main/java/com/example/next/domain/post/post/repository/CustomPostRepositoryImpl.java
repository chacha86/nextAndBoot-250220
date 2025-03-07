package com.example.next.domain.post.post.repository;

import com.example.next.domain.post.post.dto.PostListParamDto;
import com.example.next.domain.post.post.entity.Post;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import static com.example.next.domain.post.post.entity.QPost.post;

@RequiredArgsConstructor
public class CustomPostRepositoryImpl implements CustomPostRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Post> findByParam(PostListParamDto postListParamDto, Pageable pageable) {

        BooleanBuilder builder = new BooleanBuilder();
        if (postListParamDto.listed() != null) {
            builder.and(post.listed.eq(postListParamDto.listed()));
        }
        if (postListParamDto.published() != null) {
            builder.and(post.published.eq(postListParamDto.published()));
        }

        JPAQuery<Post> postJPAQuery = queryFactory.select(post)
                .from(post)
                .where(builder);

        postJPAQuery.offset(pageable.getOffset()).limit(pageable.getPageSize());
        JPAQuery<Long> totalQuery = queryFactory.select(post.count())
                .from(post)
                .where(builder);

        return PageableExecutionUtils.getPage(postJPAQuery.fetch(), pageable, totalQuery::fetchOne);
    }
}
