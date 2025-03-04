import Pagination from "@/components/business/Pagination";

export default function PagenationResponsive({
  ...props
}: {
  currentPageNo: number;
  endPageNo: number;
  keywordType?: "title" | "content";
  keyword: string;
  pageSize: number;
}) {
  return (
    <>
      <Pagination className="hidden md:block" {...props} pageBlockSize={5} />
      <Pagination className="block md:hidden" {...props} pageBlockSize={3} />
    </>
  );
}
