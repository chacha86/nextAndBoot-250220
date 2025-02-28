import { ModeToggle } from "../ui/custom/DarkModeToggle";
import HomeMenu from "./HomeMenu";
import PostMenu from "./PostMenu";
import ProfileMenu from "./ProfileMenu";

export default function WideHeader({ className }: { className: string }) {
  return (
    <div className={className}>
      <HomeMenu />
      <PostMenu />
      <ProfileMenu />
      <ModeToggle />
    </div>
  );
}
