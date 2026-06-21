import { Shield, Globe, Zap, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Stripe-powered checkout keeps every transaction safe and encrypted.',
  },
  {
    icon: Globe,
    title: 'Every Way to Travel',
    description: 'Bus, Train, Launch, and Flight bookings unified in a single place.',
  },
  {
    icon: Zap,
    title: 'Instant Booking',
    description: 'Reserve your seat in a few clicks with real-time confirmation.',
  },
  {
    icon: CheckCircle,
    title: 'Verified Vendors',
    description: 'Every provider is admin-reviewed for quality and reliability.',
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why RouteGo
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            Built for a calmer way to travel
          </h2>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">
            Everything you need to plan, book, and board with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-border bg-card p-7 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-premium">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs;