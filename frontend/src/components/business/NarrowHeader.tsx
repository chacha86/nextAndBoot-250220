import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CircleHelp,
  House,
  Menu,
  NotebookPen,
  NotebookText,
} from "lucide-react";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

export default function NarrowHeader({ className }: { className: string }) {
  return (
    <div className={className}>
      <ProfileMenu />
      <Drawer>
        <DrawerTrigger>
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="sr-only">menu</DrawerTitle>
            <DrawerDescription className="sr-only">menu</DrawerDescription>
          </DrawerHeader>
          <div>
            <ul className="flex flex-col gap-2 p-3">
              <li>
                <DrawerClose asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <House />
                    <span>메인</span>
                  </Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link href="/about" className="flex items-center gap-2">
                    <CircleHelp />
                    <span>소개</span>
                  </Link>
                </DrawerClose>
              </li>
              <hr />
              <li>
                <DrawerClose asChild>
                  <Link href="/post/write" className="flex items-center gap-2">
                    <NotebookPen />
                    <span>글 작성</span>
                  </Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link href="/post/list" className="flex items-center gap-2">
                    <NotebookText />
                    <span>글 목록</span>
                  </Link>
                </DrawerClose>
              </li>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
