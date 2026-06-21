import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const InspirationBanner = () => {
  return (
    <section className="bg-background pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border shadow-premium-lg">
          <Image
            src="/destination-banner.png"
            alt="Scenic coastal travel destination at golden hour"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/40" />
          <div className="relative flex flex-col items-start gap-5 p-8 md:p-14 lg:max-w-xl">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              New destinations
            </span>
            <h2 className="text-3xl font-bold text-white text-balance md:text-4xl">
              Explore new destinations with RouteGo
            </h2>
            <p className="text-lg text-white/85 text-pretty">
              From coastal getaways to mountain escapes, discover routes you have not traveled yet
              and book them in minutes.
            </p>
            <button className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-premium transition hover:bg-white/90">
              Discover destinations
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InspirationBanner;