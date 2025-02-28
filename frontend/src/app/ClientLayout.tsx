"use client";

import client from "@/lib/backend/client";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { ModeToggle } from "../components/ui/custom/DarkModeToggle";
import {
  LoginMemberContext,
  useLoginMember,
} from "@/stores/auth/loginMemberStore";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { useEffect } from "react";
import HomeMenu from "@/components/business/HomeMenu";
import PostMenu from "@/components/business/PostMenu";
import ProfileMenu from "@/components/business/ProfileMenu";
import WideHeader from "@/components/business/WideHeader";
import NarrowHeader from "@/components/business/NarrowHeader";

export default function ClinetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {
    setLoginMember,
    isLogin,
    loginMember,
    removeLoginMember,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  } = useLoginMember();

  const loginMemberContextValue = {
    loginMember,
    setLoginMember,
    removeLoginMember,
    isLogin,
    isLoginMemberPending,
    isAdmin,
    setNoLoginMember,
  };

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

  async function fetchLoginMember() {
    const response = await client.GET("/api/v1/members/me", {
      credentials: "include",
    });

    if (response.error) {
      setNoLoginMember();
      return;
    }

    setLoginMember(response.data.data);
  }

  useEffect(() => {
    fetchLoginMember();
  }, []);

  return (
    <>
      <LoginMemberContext.Provider value={loginMemberContextValue}>
        <header>
          <WideHeader className="flex items-center justify-end gap-3 px-4 hidden md:flex" />
          <NarrowHeader className="flex items-center justify-end gap-3 px-4 flex md:hidden" />
        </header>
        <div className="flex flex-col flex-grow justify-center items-center">
          {children}
        </div>
        <footer className="flex justify-center gap-7 p-4">
          <Link href="/adm">관리자</Link>
          <Link href="/adm/member/login">관리자 로그인</Link>
          <Link href="/member/me">내 정보</Link>
        </footer>
      </LoginMemberContext.Provider>
    </>
  );
}
