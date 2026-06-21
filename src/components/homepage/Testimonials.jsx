import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Business Traveler',
    initials: 'SA',
    color: 'from-primary to-accent',
    rating: 5,
    review:
      'RouteGo made booking my business trips effortless. The interface is intuitive and the payment process is seamless. Highly recommended.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Adventure Seeker',
    initials: 'MJ',
    color: 'from-accent to-primary',
    rating: 5,
    review:
      'I love the variety of transport options. From luxury buses to speedboats, RouteGo has everything I need for weekend getaways.',
  },
  {
    name: 'Priya Sharma',
    role: 'Frequent Traveler',
    initials: 'PS',
    color: 'from-primary to-accent',
    rating: 5,
    review:
      "Customer support is fantastic and prices are competitive. I've saved so much money using RouteGo for all my travels.",
  },
  {
    name: 'Ahmed Hassan',
    role: 'Family Vacation',
    initials: 'AH',
    color: 'from-accent to-primary',
    rating: 5,
    review:
      "Booking tickets for my entire family was so convenient. RouteGo's group booking feature saved me hours of time.",
  },
]

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Loved by travelers
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
            What our travelers say
          </h2>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">
            Join thousands of satisfied customers who trust RouteGo every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              <Quote className="h-7 w-7 text-primary/30" />

              {/* Review */}
              <p className="mt-4 flex-1 leading-relaxed text-foreground">{testimonial.review}</p>

              {/* Rating */}
              <div className="mt-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} text-sm font-bold text-primary-foreground`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials;