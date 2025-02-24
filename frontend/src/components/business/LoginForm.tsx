"use client";

import client from "@/lib/backend/client";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast, Toaster } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const { setLoginMember } = use(LoginMemberContext);
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const username = form.username.value;
    const password = form.password.value;

    if (username.trim().length === 0) {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    if (password.trim().length === 0) {
      toast.error("패스워드를 입력해주세요.");
      return;
    }

    const response = await client.POST("/api/v1/members/login", {
      body: {
        username,
        password,
      },
      credentials: "include",
    });

    if (response.error) {
      toast.error(response.error.msg);
      return;
    }

    toast.success(response.data.msg);
    setLoginMember(response.data.data.item);
    router.replace("/");
  }

  return (
    <>
      <form onSubmit={login} className="flex flex-col w-1/4 gap-3">
        <input
          type="text"
          name="username"
          placeholder="아이디 입력"
          className="border-2 border-black"
        />
        <input
          type="password"
          name="password"
          placeholder="패스워드 입력"
          className="border-2 border-black"
        />
        <input type="submit" value="로그인" />
      </form>
      <Toaster />
    </>
  );
}
