import Link from 'next/link'
import {
  Navigation,
  Share2,
  MessageSquare,
  Heart,
  Link as LinkIcon,
  CreditCard,
  Wallet,
  Landmark,
  Smartphone,
  Mail,
  Phone,
  Clock,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mb-12">
          {/* Column 1: Brand */}
          <div className="md:pr-6">
            <div className="mb-4 flex items-center gap-2.5 text-xl font-bold text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Navigation className="h-5 w-5" />
              </div>
              <span className="tracking-tight">RouteGo</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Book bus, train, launch and flight tickets easily with RouteGo.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition hover:text-primary">Home</Link>
              </li>
              <li>
                <Link href="/tickets" className="transition hover:text-primary">All Tickets</Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-primary">Contact Us</Link>
              </li>
              <li>
                <Link href="/tickets" className="transition hover:text-primary">About</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                support@routego.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                24/7 Support Available
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">We Accept</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Stripe
              </li>
              <li className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                Digital Wallets
              </li>
              <li className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-primary" />
                Bank Transfers
              </li>
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Mobile Payments
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 RouteGo. All rights reserved.
          </p>
          <div className="flex gap-2">
            {[Share2, MessageSquare, Heart, LinkIcon].map((Icon, idx) => (
              <Link
                key={idx}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;