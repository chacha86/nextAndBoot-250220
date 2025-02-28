"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import { use } from "react";
import { NotebookPen } from "lucide-react";

export default function PostMenu() {
  const { isAdmin, isLogin, loginMember } = use(LoginMemberContext);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdownMenuLabel>
            <div className="flex gap-2 items-center">
              <NotebookPen />글
            </div>
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/post/list">글 목록</Link>
          </DropdownMenuItem>
          {isLogin && (
            <DropdownMenuItem>
              <Link href="/post/write">글 작성</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
