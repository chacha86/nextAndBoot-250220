import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PostMenu from "./PostMenu";
import { ModeToggle } from "../ui/custom/DarkModeToggle";
import { Home } from "lucide-react";
import { use } from "react";
import { LoginMemberContext } from "@/stores/auth/loginMemberStore";
import ProfileMenu from "./ProfileMenu";

export default function WideHeader({ className }: { className?: string }) {
  const { isLogin } = use(LoginMemberContext);
  return (
    <div className={`${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <Home />
          Home
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
      {isLogin && <ProfileMenu />}
      <PostMenu />
      <ModeToggle />
    </div>
  );
}
