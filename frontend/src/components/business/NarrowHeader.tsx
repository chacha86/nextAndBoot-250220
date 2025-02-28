import { Menu } from "lucide-react";

export default function NarrowHeader({ className }: { className: string }) {
  return (
    <div className={className}>
      <Menu />
    </div>
  );
}
