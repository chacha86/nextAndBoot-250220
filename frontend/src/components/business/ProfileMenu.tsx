"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function HomeMenu() {
  const { isLogin, isAdmin, loginMember } = use(LoginMemberContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isLogin && (
          <DropdownMenuLabel>
            <div className="flex gap-2 items-center">
              <div>
                <Image
                  className="w-10 h-10 rounded-full"
                  src={loginMember.profileImgUrl}
                  alt="프로필 이미지"
                  width={80}
                  height={80}
                  quality={100}
                />
              </div>
            </div>
          </DropdownMenuLabel>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLogin && (
          <DropdownMenuLabel>
            <div className="text-lg">{loginMember.nickname}</div>
          </DropdownMenuLabel>
        )}

        {!isAdmin && (
          <DropdownMenuItem>
            <Link href="/adm/member/login">관리자 로그인</Link>
          </DropdownMenuItem>
        )}
        {!isLogin && (
          <DropdownMenuItem>
            <Link href="/member/join">회원 가입</Link>
          </DropdownMenuItem>
        )}
        {isLogin && (
          <DropdownMenuItem>
            <Link href="">로그아웃</Link>
          </DropdownMenuItem>
        )}
        {isLogin && (
          <DropdownMenuItem>
            <Link href="/member/me">내정보</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
