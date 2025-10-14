"use client";
import { useUserStore } from "@/store/userStore";

export default function UserBadge() {
  const user = useUserStore((s) => s.user);
  if (!user) return null;
  const label = user.name || user.email || "";
  const initials = (user.name || user.email || "?")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex items-center gap-2">
      <div className="grid place-items-center size-7 rounded-full bg-accent text-accent-foreground text-xs font-medium">
        {initials}
      </div>
      <span className="text-sm text-muted-foreground max-w-[200px] truncate">{label}</span>
    </div>
  );
}

