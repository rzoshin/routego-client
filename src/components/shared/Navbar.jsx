"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@heroui/react";
import Logo from "../ui/Logo";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { FaSignOutAlt, FaThLarge, FaUser } from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Tickets", href: "/tickets" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    data: session,
  } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          window.location.reload(); // redirect to login page
        },
      },
    });
  };
  return (
    <nav className="sticky top-0 z-50 border border-border/60 bg-background/70 backdrop-blur-xl rounded-2xl shadow-lg max-w-7xl mx-auto my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl text-foreground"
          >
            <Logo />
            <span className="tracking-tight bg-linear-to-r from-blue-900 via-blue-500 to-blue-200 bg-clip-text text-transparent">
              RouteGo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />
            {!session && !session?.user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
                >
                  Login
                </Link>
                <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90">
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
                >
                  <Image
                    width={20}
                    height={20}
                    className="w-9 h-9 rounded-full object-cover border border-pink-500 shadow-md shadow-pink-500/10"
                    src={session?.user?.image || "/default-avatar.png"}
                    alt={session?.user?.name.charAt(0).toUpperCase() || "User"}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User info */}
                    <div className="px-4 py-2.5 border-b border-white/5 mb-1.5 cursor-default">
                      <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
                        {session.user.role} Account
                      </p>
                      <p className="font-bold text-white text-sm mt-0.5">
                        {session.user.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Actions */}
                    <Link
                      href="/dashboard/organizer"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      <FaThLarge className="text-slate-400 text-sm shrink-0" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href={`/dashboard/${session.user.role}`}
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      <FaUser className="text-slate-400 text-sm shrink-0" />
                      <span>Profile Settings</span>
                    </Link>

                    <div className="border-t border-white/5 my-1.5" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
                    >
                      <FaSignOutAlt className="text-sm shrink-0 text-red-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={toggleMenu}
            className="md:hidden text-foreground hover:text-primary transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {!session ? (
                <>
                  <ThemeSwitcher />
                  <Button className="text-foreground hover:text-primary transition text-left">
                    Login
                  </Button>
                  <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition font-semibold w-full">
                    Get Started
                  </Button>
                </>
              ) : (
                <>
                  <ThemeSwitcher />
                  <Button className="text-foreground hover:text-primary transition flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
