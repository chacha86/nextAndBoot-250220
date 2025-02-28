"use client";

import client from "@/lib/backend/client";
import Link from "next/link";

import {
  LoginMemberContext,
  useLoginMember,
} from "@/stores/auth/loginMemberStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
        <header className="flex justify-end gap-3 px-4">
          <WideHeader className="hidden md:flex" />
          <NarrowHeader className="md:hidden flex" />
        </header>
        <div className="flex flex-col flex-grow justify-center items-center">
          {children}
        </div>
        <footer className="flex justify-center gap-7 p-4">
          <Link href="/adm/member/login">관리자 로그인</Link>
        </footer>
      </LoginMemberContext.Provider>
    </>
  );
}
