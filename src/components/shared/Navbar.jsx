'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, User, Navigation } from 'lucide-react'
import { Button } from '@heroui/react'
import Logo from '../ui/Logo'
import ThemeSwitcher from '../ui/ThemeSwitcher'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Tickets', href: '/tickets' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="sticky top-0 z-50 border border-border/60 bg-background/70 backdrop-blur-xl rounded-2xl shadow-lg max-w-7xl mx-auto my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-foreground">
            <Logo />
            <span className="tracking-tight bg-linear-to-r from-blue-900 via-blue-500 to-blue-200 bg-clip-text text-transparent">RouteGo</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeSwitcher />
            {!isLoggedIn ? (
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
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/80 transition">
                  <User className="w-5 h-5 text-accent-foreground" />
                </div>
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-foreground hover:text-primary transition flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
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
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition ${
                      isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {!isLoggedIn ? (
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
  )
}
