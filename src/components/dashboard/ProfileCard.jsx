"use client";
import Image from "next/image";
import { Card, Chip } from "@heroui/react";

const roleStyles = {
  user: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  vendor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  admin: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function ProfileCard({ user, profile }) {
  const role = user?.role || profile?.role || "user";
  const avatarUrl =
    user?.image ||
    profile?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=2563eb&color=fff&bold=true`;
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : "Recently joined";

  return (
    <Card className="border border-border bg-background/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl text-foreground">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-border/50">
          <Image
            src={avatarUrl}
            alt={user?.name || "User avatar"}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <Chip
              size="sm"
              className={`font-bold uppercase text-[10px] tracking-wider border ${roleStyles[role] || roleStyles.user}`}
            >
              {role}
            </Chip>
            <h2 className="mt-2 text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <p>
              <span>Member since:</span> {memberSince}
            </p>
            <p>
              <span>Account type:</span>{" "}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
