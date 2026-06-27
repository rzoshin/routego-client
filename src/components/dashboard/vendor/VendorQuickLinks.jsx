"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { FaCalendarAlt, FaHistory, FaPlus, FaUsers } from "react-icons/fa";

const links = [
  {
    href: "/dashboard/vendor/add-ticket",
    label: "Add Ticket",
    description: "Submit a new travel ticket",
    icon: FaPlus,
  },
  {
    href: "/dashboard/vendor/added-tickets",
    label: "My Added Tickets",
    description: "Manage your ticket listings",
    icon: FaCalendarAlt,
  },
  {
    href: "/dashboard/vendor/bookings",
    label: "Requested Bookings",
    description: "Review pending booking requests",
    icon: FaUsers,
  },
  {
    href: "/dashboard/vendor/revenues",
    label: "Revenue Overview",
    description: "Track sales and earnings",
    icon: FaHistory,
  },
];

export default function VendorQuickLinks({ isFraud = false }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {links.map(({ href, label, description, icon: Icon }) => {
        const disabled = isFraud && href === "/dashboard/vendor/add-ticket";

        if (disabled) {
          return (
            <Card
              key={href}
              className="border border-border/5 bg-background/20 p-5 rounded-2xl opacity-50"
            >
              <Icon className="mb-3 text-muted-foreground" size={20} />
              <p className="font-semibold text-muted-foreground">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            </Card>
          );
        }

        return (
          <Link key={href} href={href}>
            <Card className="border border-border/5 bg-background/40 backdrop-blur-xl p-5 rounded-2xl transition-colors hover:border-indigo-500/30 hover:bg-background/60 h-full">
              <Icon className="mb-3 text-primary" size={20} />
              <p className="font-semibold text-foreground">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
