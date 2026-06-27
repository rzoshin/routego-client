"use client";

import Logo from "@/components/ui/Logo";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaHistory,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";

const roleBadgeStyles = {
  admin: "text-primary",
  vendor: "text-accent",
  user: "text-muted-foreground",
};

const DashboardSideBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const vendorMenu = [
    { key: "profile", label: "My Profile", icon: FaUsers, href: "/dashboard/vendor" },
    { key: "add-ticket", label: "Add Ticket", icon: FaPlus, href: "/dashboard/vendor/add-ticket" },
    { key: "my-tickets", label: "My Added Tickets", icon: FaCalendarAlt, href: "/dashboard/vendor/added-tickets" },
    { key: "bookings", label: "Requested Bookings", icon: FaUsers, href: "/dashboard/vendor/bookings" },
    { key: "revenues", label: "Revenue Overview", icon: FaHistory, href: "/dashboard/vendor/revenues" },
  ];

  const userMenu = [
    { key: "profile", label: "My Profile", icon: FaUserCircle, href: "/dashboard/user" },
    { key: "tickets", label: "My Booked Tickets", icon: FaTicketAlt, href: "/dashboard/user/tickets" },
    { key: "transactions", label: "Transactions", icon: FaHistory, href: "/dashboard/user/transactions" },
  ];

  const adminMenu = [
    { key: "profile", label: "My Profile", icon: FaUserShield, href: "/dashboard/admin" },
    { key: "manage-tickets", label: "Manage Tickets", icon: FaCalendarAlt, href: "/dashboard/admin/tickets" },
    { key: "manage-users", label: "Manage Users", icon: FaUsers, href: "/dashboard/admin/users" },
    { key: "advertise-tickets", label: "Advertise Tickets", icon: FaHistory, href: "/dashboard/admin/advertise-tickets" },
  ];

  const role = session?.user?.role;
  const menuItems =
    role === "vendor" ? vendorMenu : role === "user" ? userMenu : role === "admin" ? adminMenu : null;

  const navLinkClass =
    "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent/15 hover:text-sidebar-foreground";

  return (
    <aside className="h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-5">
          <Logo />
          <span className="text-lg font-bold tracking-tight text-primary">RouteGo</span>
        </div>

        <div className="border-b border-sidebar-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/40">
              <Image
                width={40}
                height={40}
                src={
                  session?.user?.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "User")}&background=2563eb&color=fff&bold=true`
                }
                alt="Avatar"
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold leading-tight text-sidebar-foreground">
                {session?.user?.name}
              </p>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${roleBadgeStyles[role] || roleBadgeStyles.user}`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>

        <nav className="grow space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Navigation
          </p>
          {menuItems?.map(({ key, label, icon: Icon, href }) => (
            <Link key={key} href={href} className={navLinkClass}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Icon size={20} />
              </span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-sidebar-border px-3 py-4">
          <Link href="/" className={navLinkClass}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <FaHome size={13} />
            </span>
            Back to Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-150 hover:bg-destructive/10 hover:text-destructive"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <FaSignOutAlt size={13} />
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSideBar;
