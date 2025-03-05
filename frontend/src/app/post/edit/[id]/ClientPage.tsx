"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { components } from "@/lib/backend/apiV1/schema";
import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";

export default function ClinetPage({
  post,
}: {
  post: components["schemas"]["PostWithContentDto"];
}) {
  const router = useRouter();

  async function write(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const title = form._title.value;
    const content = form.content.value;
    const published = form.published.checked;
    const listed = form.listed.checked;

    if (title.trim().length === 0) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (content.trim().length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const response = await client.PUT("/api/v1/posts/{id}", {
      params: {
        path: { id: post.id },
      },
      body: {
        title,
        content,
        published,
        listed,
      },
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    // 목록으로 이동, 내가 방금 작성한 글 상세 페이지 이동 => 리액트 방식의 페이지 이동
    router.push(`/post/${post.id}`);
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold text-center">글 수정</h1>
      <hr />
      <form onSubmit={write} className="flex flex-col gap-3 py-4">
        <div className="flex items-center gap-3">
          <label>공개 여부 : </label>
          <Checkbox name="published" defaultChecked={post.published} />
        </div>
        <div className="flex items-center gap-3">
          <label>검색 여부 : </label>
          <Checkbox name="listed" defaultChecked={post.listed} />
        </div>
        <Input
          type="text"
          name="_title"
          placeholder="제목 입력"
          defaultValue={post.title}
          className="border-2 border-black"
        />
        <Textarea
          name="content"
          placeholder="내용 입력"
          className="h-[calc(100dvh-300px)]"
          defaultValue={post.content}
        />
        <Button type="submit">수정</Button>
      </form>
    </div>
  );
}
