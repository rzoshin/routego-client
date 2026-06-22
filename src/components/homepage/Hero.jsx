import { Search, MapPin, Calendar, Bus, Sparkles, Star, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from "@heroui/react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/60 min-h-screen flex items-center">
      {/* Background */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/banner.jpeg"
          alt="Hero Background"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-80"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Hero Content */}
        <div className="text-center mb-12 md:mb-14">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-[#1E293B]/60 px-4 py-1.5 text-sm font-medium text-white/70 backdrop-blur-sm mb-7">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>50,000+ travelers · 100+ routes</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            Travel smarter,
            <br />
            book <span className="text-primary">in minutes</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed">
            Bus, Train, Launch, or Flight — search and book across Bangladesh on one platform.
          </p>
        </div>

        {/* Search Widget */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-1.5 backdrop-blur-md shadow-2xl">
            <div className="rounded-xl bg-white dark:bg-card p-5 md:p-6">
              {/* Fields */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'From', icon: MapPin, placeholder: 'Dhaka', iconClass: 'text-muted-foreground' },
                  { label: 'To', icon: MapPin, placeholder: 'Chattogram', iconClass: 'text-primary' },
                ].map(({ label, icon: Icon, placeholder, iconClass }) => (
                  <div key={label} className="text-left">
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`} />
                      <input
                        type="text"
                        placeholder={placeholder}
                        className="w-full rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                ))}

                {/* Date */}
                <div className="text-left">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    Departure
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      className="w-full rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Transport */}
                <div className="text-left">
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    Transport
                  </label>
                  <div className="relative">
                    <Bus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select className="w-full appearance-none rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>All Types</option>
                      <option>Bus</option>
                      <option>Train</option>
                      <option>Flight</option>
                      <option>Launch</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <Button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98]">
                  <Search className="h-4 w-4" />
                  Search Tickets
                </Button>
                <Button className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background/60 px-6 py-3 font-medium text-foreground transition hover:bg-secondary">
                  Explore Routes
                  <ArrowRight className="h-4 w-4 opacity-60" />
                </Button>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium">4.9</span> from 12k+ reviews
            </span>
            <span className="text-border/60">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-white dark:text-primary" />
              Secure Stripe payments
            </span>
            <span className="text-border/60">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-white dark:text-primary" />
              Instant confirmation
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;