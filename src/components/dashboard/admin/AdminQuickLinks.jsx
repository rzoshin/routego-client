"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { FaCalendarAlt, FaHistory, FaUsers } from "react-icons/fa";

const links = [
  {
    href: "/dashboard/admin/tickets",
    label: "Manage Tickets",
    description: "Approve or reject vendor submissions",
    icon: FaCalendarAlt,
  },
  {
    href: "/dashboard/admin/users",
    label: "Manage Users",
    description: "Change roles and mark fraud vendors",
    icon: FaUsers,
  },
  {
    href: "/dashboard/admin/advertise-tickets",
    label: "Advertise Tickets",
    description: "Feature up to 6 tickets on the homepage",
    icon: FaHistory,
  },
];

export default function AdminQuickLinks() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {links.map(({ href, label, description, icon: Icon }) => (
        <Link key={href} href={href}>
          <Card className="h-full rounded-2xl border border-border bg-card p-5 shadow-premium transition hover:border-primary/30">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon size={18} />
            </div>
            <h3 className="font-bold text-foreground">{label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
