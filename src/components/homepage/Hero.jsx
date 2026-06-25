import { Sparkles, Star, ShieldCheck } from 'lucide-react'
import Image from 'next/image';
import HeroSearch from './HeroSearch';

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

        <HeroSearch />

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
    </section>
  )
}

export default Hero;