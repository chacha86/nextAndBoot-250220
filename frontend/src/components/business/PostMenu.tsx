"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function HomeMenu() {
  const { isLogin } = use(LoginMemberContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-2 items-center">
          <NotebookPen /> 글
        </div>
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
  );
}
