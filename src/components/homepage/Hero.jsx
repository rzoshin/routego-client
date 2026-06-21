import { Search, MapPin, Calendar, Bus, Sparkles, Star, ShieldCheck } from 'lucide-react'
import { Button } from "@heroui/react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Layered background */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-glow" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Hero Content */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-premium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Trusted by 50,000+ travelers across 100+ routes
          </div>

          <h1 className="mt-7 text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground text-balance leading-[1.05]">
            Book your next journey
            <br className="hidden sm:block" />
            <span className="text-primary"> in minutes</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
            Find and book Bus, Train, Launch, and Flight tickets quickly and securely.
            One platform, endless destinations.
          </p>
        </div>

        {/* Search Widget */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-border bg-card/90 p-2 shadow-premium-lg backdrop-blur-md">
            <div className="rounded-[1.25rem] bg-card p-6 md:p-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* From Location */}
                <div className="text-left">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Dhaka"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* To Location */}
                <div className="text-left">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                    <input
                      type="text"
                      placeholder="Chattogram"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="text-left">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Departure
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>

                {/* Transport Type */}
                <div className="text-left">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Transport
                  </label>
                  <div className="relative">
                    <Bus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select className="w-full appearance-none rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option>All Types</option>
                      <option>Bus</option>
                      <option>Train</option>
                      <option>Flight</option>
                      <option>Launch</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button className="flex flex-1 items-center bg-linear-to-r from-blue-900 to-blue-600 justify-center gap-2 rounded-xl py-3.5 font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90">
                  <Search className="h-5 w-5" />
                  Search Tickets
                </Button>
                <Button className="flex-1 rounded-xl border border-border bg-background py-3.5 font-semibold text-foreground transition hover:bg-secondary">
                  Explore Routes
                </Button>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure Stripe payments
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-accent text-accent" />
              4.9/5 from 12,000+ reviews
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Instant booking confirmation
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;