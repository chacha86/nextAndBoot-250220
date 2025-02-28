"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import { use } from "react";
import { useRouter } from "next/navigation";
import client from "@/lib/backend/client";

export default function ProfileMenu() {
  const { isAdmin, loginMember, removeLoginMember } = use(LoginMemberContext);
  const router = useRouter();

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const response = await client.DELETE("/api/v1/members/logout", {
      credentials: "include",
    });

    if (response.error) {
      alert(response.error.msg);
      return;
    }

    removeLoginMember();
    router.replace("/");
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdownMenuLabel>
            <div className="flex gap-2 items-center">
              <div>
                <img
                  src={loginMember.profileImgUrl}
                  alt="profileImg"
                  className="w-7 h-7 rounded-full object-cover hover:cursor-pointer"
                />
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/member/me">
              <div className="text-lg hover:cursor-pointer hover:underline">
                {loginMember.nickname}
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="" onClick={handleLogout}>
              로그아웃
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
