"use client";

import { Button } from "@/components/ui/button";
import ComboboxDemo from "@/components/ui/custom/Combobox";
import { Input } from "@/components/ui/input";
import { components } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function ClinetPage({
  rsData,
  keywordType,
  keyword,
  pageSize,
  page,
}: {
  rsData: components["schemas"]["RsDataPageDto"];
  keywordType: "title" | "content";
  keyword: string;
  pageSize: number;
  page: number;
}) {
  const router = useRouter();
  const pageDto = rsData.data;

  return (
    <div className="container p-4 mx-auto">
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
      <CustomPagination
        totalPages={pageDto.totalPages}
        keywordType={keywordType}
        keyword={keyword}
        pageSize={pageSize}
        page={page}
        pageArmSize={1}
        className="flex md:hidden"
      />
      <CustomPagination
        totalPages={pageDto.totalPages}
        keywordType={keywordType}
        keyword={keyword}
        pageSize={pageSize}
        page={page}
        pageArmSize={3}
        className="hidden md:flex"
      />
      <ul className="flex flex-wrap gap-4 py-4">
        {pageDto.items.map((item) => {
          return (
            <li key={item.id} className="w-[calc(100%/3-1rem)]">
              <Link href={`/post/${item.id}`}>
                <Card className="hover:bg-gray-100">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="sr-only">
                      {item.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>작성자 : {item.authorName}</p>
                    <p>
                      작성일 :{" "}
                      {new Intl.DateTimeFormat("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h23",
                      })
                        .format(new Date(item.createdDate))
                        .replace(/\. /g, ". ")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CustomPagination({
  totalPages,
  keywordType,
  keyword,
  pageSize,
  page,
  pageArmSize,
  className,
}: {
  totalPages: number;
  keywordType: "title" | "content";
  keyword: string;
  pageSize: number;
  page: number;
  pageArmSize: number;
  className?: string;
}) {
  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const startPageNo = 1;
  const endPageNo = totalPages;
  let startPageNoOfBlock = Number(page) - pageArmSize;
  let endPageNoOfBlock = Number(page) + pageArmSize;

  startPageNoOfBlock =
    startPageNoOfBlock <= startPageNo ? startPageNo + 1 : startPageNoOfBlock;

  endPageNoOfBlock =
    endPageNoOfBlock >= endPageNo ? endPageNo - 1 : endPageNoOfBlock;

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=1`}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {page - startPageNo > pageArmSize + 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {range(startPageNoOfBlock, endPageNoOfBlock).map((pageNo) => {
            return (
              <PaginationItem key={pageNo}>
                <PaginationLink
                  isActive={pageNo == page}
                  href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${pageNo}`}
                >
                  {pageNo}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {endPageNo - page > pageArmSize + 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${totalPages}`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
