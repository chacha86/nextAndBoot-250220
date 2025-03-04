"use client";

import PagenationResponsive from "@/components/business/PagenationResponsive";
import { Button } from "@/components/ui/button";
import ComboboxDemo from "@/components/ui/custom/Combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { components } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClinetPage({
  rsData,
  keywordType,
  keyword,
  pageSize,
  page,
}: {
  rsData: components["schemas"]["RsDataPageDto"];
  keywordType?: "title" | "content";
  keyword: string;
  pageSize: number;
  page: number;
}) {
  const router = useRouter();
  const pageDto = rsData.data;

  const [searchKeywordType, setSearchKeywordType] = useState<
    "title" | "content"
  >(keywordType ?? "title");
  const [open, setOpen] = useState(false);
  return (
    <div className="container mx-auto px-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            검색
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>검색</DialogTitle>
            <DialogDescription className="sr-only">검색</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.target as HTMLFormElement);
              const searchKeyword = formData.get("keyword") as string;
              const page = 1;
              router.push(
                `/post/list?keywordType=${searchKeywordType}&keyword=${searchKeyword}&pageSize=${pageSize}&page=${page}`
              );
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-3 py-3">
              <ComboboxDemo
                selectedValue={pageSize.toString()}
                itemList={[
                  { value: "10", label: "10" },
                  { value: "20", label: "20" },
                  { value: "30", label: "30" },
                ]}
                title="행 개수"
                handleChange={(value) => {
                  router.push(
                    `/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${value}&page=${page}`
                  );
                }}
              />
              <ComboboxDemo
                selectedValue={searchKeywordType}
                itemList={[
                  { value: "title", label: "제목" },
                  { value: "content", label: "내용" },
                ]}
                title="검색 대상"
                handleChange={(value) => {
                  setSearchKeywordType(value as "title" | "content");
                }}
              />

              <Input
                type="text"
                placeholder="검색어 입력"
                name="keyword"
                defaultValue={keyword}
                // className="w-[200px]"
              />

              <Button>검색</Button>
            </div>
          </form>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PagenationResponsive
        currentPageNo={pageDto.currentPageNo}
        endPageNo={pageDto.totalPages}
        keywordType={keywordType}
        keyword={keyword}
        pageSize={pageSize}
      />
      {pageDto.items.length === 0 ? (
        <div className="flex flex-col min-h-[calc(100dvh-280px)] items-center justify-center py-12 text-muted-foreground">
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul>
          {pageDto.items.map((item) => {
            return (
              <li className="border-2 border-red-500 my-2 p-2" key={item.id}>
                <Link href={`/post/${item.id}`}>
                  <div>id : {item.id}</div>
                  <div>title : {item.title}</div>
                  <div>authorId : {item.authorId}</div>
                  <div>authorName : {item.authorName}</div>
                  <div>published : {`${item.published}`}</div>
                  <div>listed : {`${item.listed}`}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
