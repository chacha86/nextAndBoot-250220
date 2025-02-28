"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import { House } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function HomeMenu() {
  const { isLogin, loginMember } = use(LoginMemberContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-2 items-center">
          <House />
          Home
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/">메인</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/about">소개</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
