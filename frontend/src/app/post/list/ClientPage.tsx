"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { components } from "@/lib/backend/apiV1/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [changeKeyword, setChangeKeyword] = useState(false);
  const router = useRouter();
  const pageDto = rsData.data;

  useEffect(() => {
    if (changeKeyword) {
      setChangeKeyword(false);
    }
  }, [changeKeyword]);

  return (
    <div className="container p-4 mx-auto">
      <div className="flex justify-between gap-4">
        <SearchDailog
          keyword={keyword}
          keywordType={keywordType}
          pageSize={pageSize}
          setChangeKeyword={setChangeKeyword}
        />
        <div className="flex items-center gap-4">
          <p className="text-gray-500">총 {pageDto.totalItems}개의 게시글</p>
          <PageSizeSelect
            pageSize={pageSize}
            className="w-[180px]"
            onValueChangeHandle={(pageSize: string) => {
              console.log("onValueChangeHandle");
              router.push(
                `/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${page}`
              );
            }}
          />
        </div>
      </div>
      <CustomPagination
        totalPages={pageDto.totalPages}
        keywordType={keywordType}
        keyword={keyword}
        pageSize={pageSize}
        page={page}
        pageArmSize={1}
        className="flex md:hidden p-4"
      />
      <CustomPagination
        totalPages={pageDto.totalPages}
        keywordType={keywordType}
        keyword={keyword}
        pageSize={pageSize}
        page={page}
        pageArmSize={3}
        className="hidden md:flex p-4"
      />
      {pageDto.items.length === 0 ? (
        <div className="flex flex-col min-h-[calc(100dvh-280px)] items-center justify-center py-12 text-muted-foreground">
          <Search />
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 p-4">
          {pageDto.items.map((item) => {
            return (
              <li
                className="w-full lg:w-[calc(100%/3-1rem)] md:w-[calc(100%/2-1rem)]"
                key={item.id}
              >
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
                        {new Date(item.createdDate).toLocaleString("ko-KR", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SearchDailog({
  keyword,
  keywordType,
  pageSize,
  setChangeKeyword,
}: {
  keyword: string;
  keywordType: "title" | "content";
  pageSize: number;
  setChangeKeyword: (changeKeyword: boolean) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2">
        <Search className="cursor-pointer" />
        <Input
          type="text"
          placeholder="검색어 입력"
          readOnly
          className="cursor-pointer text-gray-400"
          defaultValue={
            {
              title: "제목 : ",
              content: "내용 : ",
            }[keywordType] + keyword
          }
          onClick={() => {
            setOpen(true);
          }}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription className="sr-only">
            Search Dialog
          </DialogDescription>
        </DialogHeader>
        <form
          className="p-4"
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);
            const searchKeyword = formData.get("keyword") as string;
            const searchKeywordType = formData.get("keywordType") as string;
            const pageSize = formData.get("pageSize") as string;
            const page = 1;

            router.push(
              `/post/list?keywordType=${searchKeywordType}&keyword=${searchKeyword}&pageSize=${pageSize}&page=${page}`
            );
            setOpen(false);
            setChangeKeyword(true);
          }}
        >
          <div className="flex flex-col gap-3 py-3">
            <div className="flex gap-3">
              <PageSizeSelect pageSize={pageSize} />
              <Select name="keywordType" defaultValue={keywordType}>
                <SelectTrigger>
                  <SelectValue placeholder="검색 대상" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">제목</SelectItem>
                  <SelectItem value="content">내용</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              type="text"
              placeholder="검색어 입력"
              name="keyword"
              defaultValue={keyword}
            />
            <Button>검색</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PageSizeSelect({
  pageSize,
  className,
  onValueChangeHandle,
}: {
  pageSize: number;
  className?: string;
  onValueChangeHandle?: (pageSize: string) => void;
}) {
  return (
    <Select
      name="pageSize"
      defaultValue={String(pageSize)}
      onValueChange={onValueChangeHandle}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="행 개수" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10개씩 보기</SelectItem>
        <SelectItem value="30">30개씩 보기</SelectItem>
        <SelectItem value="50">50개씩 보기</SelectItem>
      </SelectContent>
    </Select>
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

  if (totalPages === 0) {
    return;
  }

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=1`}
            >
              {startPageNo}
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
          {endPageNo != startPageNo && (
            <PaginationItem>
              <PaginationLink
                href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${totalPages}`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
