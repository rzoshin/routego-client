import { ArrowRight } from 'lucide-react'

const CTA = () => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent px-6 py-16 text-center shadow-premium-lg md:px-12 md:py-20">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground text-balance leading-tight">
              Ready for your next adventure?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/90 text-pretty">
              Explore new routes, discover amazing destinations, and book your tickets with confidence.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-7 py-3.5 font-semibold text-foreground shadow-premium transition hover:bg-background/90">
                Find Tickets
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="rounded-xl border border-primary-foreground/40 bg-transparent px-7 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary-foreground/10">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA;