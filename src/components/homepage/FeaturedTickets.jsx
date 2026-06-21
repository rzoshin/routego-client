import { ArrowRight, Star, Users, Clock } from 'lucide-react'
import Image from 'next/image'

const tickets = [
  {
    id: 1,
    image: '/bus-ticket.png',
    route: 'Dhaka → Chattogram',
    type: 'Bus',
    price: '$12',
    departure: '08:30 AM',
    duration: '6h 15m',
    seats: '5 seats left',
    rating: '4.8',
    perks: ['WiFi', 'AC', 'Snacks'],
  },
  {
    id: 2,
    image: '/train-ticket.png',
    route: 'Dhaka → Sylhet',
    type: 'Train',
    price: '$18',
    departure: '09:15 AM',
    duration: '5h 40m',
    seats: '8 seats left',
    rating: '4.9',
    perks: ['Dining', 'Sleeper', 'Charging'],
  },
  {
    id: 3,
    image: '/flight-ticket.png',
    route: "Dhaka → Cox's Bazar",
    type: 'Flight',
    price: '$45',
    departure: '10:00 AM',
    duration: '1h 05m',
    seats: '12 seats left',
    rating: '4.9',
    perks: ['Meals', 'Luggage', 'Priority'],
  },
  {
    id: 4,
    image: '/launch-ticket.png',
    route: 'Dhaka → Barishal',
    type: 'Launch',
    price: '$15',
    departure: '07:00 AM',
    duration: '8h 30m',
    seats: '20 seats left',
    rating: '4.7',
    perks: ['Deck Views', 'Café', 'Cabin'],
  },
  {
    id: 5,
    image: '/bus-ticket.png',
    route: 'Chattogram → Sylhet',
    type: 'Bus',
    price: '$14',
    departure: '06:30 AM',
    duration: '7h 20m',
    seats: '3 seats left',
    rating: '4.6',
    perks: ['WiFi', 'AC', 'USB'],
  },
  {
    id: 6,
    image: '/train-ticket.png',
    route: "Sylhet → Cox's Bazar",
    type: 'Train',
    price: '$22',
    departure: '11:45 AM',
    duration: '9h 10m',
    seats: '6 seats left',
    rating: '4.8',
    perks: ['Dining', 'AC', 'Charging'],
  },
]

const FeaturedTickets =() => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Featured
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
              Popular routes, ready to book
            </h2>
            <p className="mt-3 text-lg text-muted-foreground text-pretty">
              Handpicked departures across bus, train, flight, and launch.
            </p>
          </div>
          <button className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary">
            View all tickets
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={ticket.image}
                  alt={ticket.route}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-premium backdrop-blur-sm">
                  {ticket.type}
                </span>
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-premium backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  {ticket.rating}
                </span>
                <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white drop-shadow">
                  {ticket.route}
                </h3>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {ticket.departure}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ArrowRight className="h-4 w-4" />
                    {ticket.duration}
                  </span>
                </div>

                {/* Perks */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {ticket.perks.map((perk, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-sm text-accent">
                  <Users className="h-4 w-4" />
                  {ticket.seats}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-border pt-5 mt-6">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{ticket.price}</span>
                    <span className="text-sm text-muted-foreground"> / seat</span>
                  </div>
                  <button className="group/btn inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90">
                    Book now
                    <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedTickets;