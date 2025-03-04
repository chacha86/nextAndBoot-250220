"use client";

import { Button } from "@/components/ui/button";
import ComboboxDemo from "@/components/ui/custom/Combobox";
import { Input } from "@/components/ui/input";
import { components } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  return (
    <div className="container p-4 mx-auto">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: pageDto.totalPages }, (_, i) => i + 1).map(
            (pageNo) => {
              return (
                <PaginationItem key={pageNo}>
                  <PaginationLink
                    href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${pageNo}`}
                  >
                    {pageNo}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const searchKeyword = formData.get("keyword") as string;
          const searchKeywordType = formData.get("keywordType") as string;
          const page = 1;
          const pageSize = formData.get("pageSize") as string;

          router.push(
            `/post/list?keywordType=${searchKeywordType}&keyword=${searchKeyword}&pageSize=${pageSize}&page=${page}`
          );
        }}
      >
        {/* <select name="keywordType" defaultValue={keywordType}>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select> */}

        <div className="flex gap-3 py-3">
          <ComboboxDemo
            itemList={[
              { value: "title", label: "제목" },
              { value: "content", label: "내용" },
            ]}
            title="검색 대상"
          />
          <Input
            type="text"
            placeholder="검색어 입력"
            name="keyword"
            defaultValue={keyword}
            className="w-[200px]"
          />
          <Button>검색</Button>
        </div>

        <label className="ml-5" htmlFor="">
          페이지당 행 개수 :
        </label>
        <ComboboxDemo
          itemList={[
            { value: "10", label: "10" },
            { value: "30", label: "20" },
            { value: "50", label: "30" },
          ]}
          title="행 개수"
        />
      </form>
      <div className="flex gap-3">
        {Array.from({ length: pageDto.totalPages }, (_, i) => i + 1).map(
          (pageNo) => {
            return (
              <Link
                key={pageNo}
                className={pageNo == page ? `text-red-500` : `text-blue-500`}
                href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${pageNo}`}
              >
                {pageNo}
              </Link>
            );
          }
        )}
      </div>
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
    </div>
  );
}
