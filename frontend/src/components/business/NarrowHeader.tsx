import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { CircleHelp, Home, Menu, Newspaper, PencilLine } from "lucide-react";
import Link from "next/link";

export default function NarrowHeader({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Drawer>
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>전체 메뉴</DrawerTitle>
          </DrawerHeader>
          <div className="max-h-[calc(100dvh-150px)] px-2 pb-2 overflow-y-auto">
            <ul>
              <li>
                <DrawerClose asChild>
                  <Link className="flex w-full items-center gap-3 p-2" href="/">
                    <Home />
                    <span>메인</span>
                  </Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link
                    className="flex w-full items-center gap-3 p-2"
                    href="/about"
                  >
                    <CircleHelp />
                    <span>소개</span>
                  </Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link
                    className="flex w-full items-center gap-3 p-2"
                    href="/post/list"
                  >
                    <Newspaper />
                    <span>글 목록</span>
                  </Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link
                    className="flex w-full items-center gap-3 p-2"
                    href="/post/write"
                  >
                    <PencilLine />
                    <span>글 작성</span>
                  </Link>
                </DrawerClose>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
      {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>메뉴</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModeToggle /> */}
    </div>
  );
}
