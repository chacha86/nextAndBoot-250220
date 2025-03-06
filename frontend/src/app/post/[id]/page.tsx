import client from "@/lib/backend/client";
import { cookies } from "next/headers";
import ClientPage from "./ClientPage";

export default async function Page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return <ClientPage post={post} />;
}

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  const product = await getPost(Number(id));

  if (!product) {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }

  return {
    title: product.title,
    description: product.content,
  };
}

async function getPost(id: number) {
  const response = await client.GET("/api/v1/posts/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      cookie: (await cookies()).toString(),
    },
  });

  if (response.error) {
    return null;
  }

  const rsData = response.data;
  const post = rsData.data;

  return post;
}
