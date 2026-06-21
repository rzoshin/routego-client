import { ArrowRight } from 'lucide-react'

const routes = [
  { from: 'Dhaka', to: 'Chattogram', tickets: '245+ tickets', fill: 'w-11/12' },
  { from: 'Dhaka', to: 'Sylhet', tickets: '189+ tickets', fill: 'w-4/5' },
  { from: 'Dhaka', to: "Cox's Bazar", tickets: '156+ tickets', fill: 'w-3/4' },
  { from: 'Dhaka', to: 'Rajshahi', tickets: '132+ tickets', fill: 'w-2/3' },
  { from: 'Chattogram', to: 'Sylhet', tickets: '98+ tickets', fill: 'w-1/2' },
  { from: 'Khulna', to: 'Dhaka', tickets: '87+ tickets', fill: 'w-1/2' },
]

const PopularRoutes = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Trending
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Most traveled routes this month
          </h2>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">
            Where everyone is heading. Find your destination and book ahead.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((route, idx) => (
            <div
              key={idx}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-premium-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <span>{route.from}</span>
                  <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
                  <span>{route.to}</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{route.tickets} available</p>
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className={`h-full rounded-full bg-gradient-to-r from-primary to-accent ${route.fill}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularRoutes;