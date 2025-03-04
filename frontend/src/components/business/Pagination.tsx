import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function Pagenation({
  currentPageNo,
  endPageNo,
  pageBlockSize,
  keywordType,
  keyword,
  pageSize,
  className,
}: {
  currentPageNo: number;
  endPageNo: number;
  pageBlockSize: number;
  keywordType?: "title" | "content";
  keyword: string;
  pageSize: number;
  className?: string;
}) {
  const startPageNo = 1;
  let startPageNoOfCurrentPageBlock =
    Number(currentPageNo) - Math.floor(pageBlockSize / 2);
  let endPageNoOfCurrentPageBlock =
    Number(currentPageNo) + Math.floor(pageBlockSize / 2);

  startPageNoOfCurrentPageBlock =
    startPageNoOfCurrentPageBlock <= startPageNo
      ? startPageNo + 1
      : startPageNoOfCurrentPageBlock;

  endPageNoOfCurrentPageBlock =
    endPageNoOfCurrentPageBlock >= endPageNo
      ? endPageNo - 1
      : endPageNoOfCurrentPageBlock;

  const range = (n: number, m: number): number[] =>
    Array.from({ length: m - n + 1 }, (_, i) => n + i);

  if (endPageNo < startPageNo) return;

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${startPageNo}`}
              isActive={startPageNo === Number(currentPageNo)}
            >
              {startPageNo}
            </PaginationLink>
          </PaginationItem>
          {Number(currentPageNo) >= pageBlockSize && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            {range(
              startPageNoOfCurrentPageBlock,
              endPageNoOfCurrentPageBlock
            ).map((pageNo) => {
              return (
                <PaginationLink
                  key={pageNo}
                  href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${pageNo}`}
                  isActive={pageNo === Number(currentPageNo)}
                >
                  {pageNo}
                </PaginationLink>
              );
            })}
          </PaginationItem>
          {endPageNo - Number(currentPageNo) >= pageBlockSize - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {endPageNo !== startPageNo && (
            <PaginationItem>
              <PaginationLink
                href={`/post/list?keywordType=${keywordType}&keyword=${keyword}&pageSize=${pageSize}&page=${endPageNo}`}
                isActive={endPageNo === Number(currentPageNo)}
              >
                {endPageNo}
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
