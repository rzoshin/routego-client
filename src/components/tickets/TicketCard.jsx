'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Star, Users, Heart, Sparkles, Bus, TrainFront, Ship, Plane } from 'lucide-react'

const typeIcon = {
  Bus: Bus,
  Train: TrainFront,
  Launch: Ship,
  Flight: Plane,
}

const TicketCard = ({ ticket }) => {
  const [saved, setSaved] = useState(false)
  const lowSeats = ticket.seats <= 5
  const TypeIcon = typeIcon[ticket.type]

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-premium-lg">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={ticket.image || '/placeholder.svg'}
          alt={`${ticket.from} to ${ticket.to} by ${ticket.type}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        {/* Type chip */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-premium backdrop-blur-sm">
          <TypeIcon className="h-3.5 w-3.5 text-primary" />
          {ticket.type}
        </span>

        {/* Featured */}
        {ticket.featured && (
          <span className="absolute left-4 bottom-4 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground shadow-premium">
            <Sparkles className="h-3 w-3" />
            Featured
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? 'Remove from saved' : 'Save ticket'}
          aria-pressed={saved}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-premium backdrop-blur-sm transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 transition ${saved ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Operator + rating */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">{ticket.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{ticket.date}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {ticket.rating}
          </span>
        </div>

        {/* Route timeline (Google Flights style) */}
        <div className="mt-5 flex items-center gap-3">
          <div className="text-left">
            <p className="text-sm font-bold text-foreground">{ticket.departure}</p>
            <p className="text-xs text-muted-foreground">{ticket.from}</p>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <span className="text-[11px] font-medium text-muted-foreground">{ticket.duration}</span>
            <div className="mt-1 flex w-full items-center">
              <span className="h-2 w-2 rounded-full border-2 border-primary bg-card" />
              <span className="h-px flex-1 bg-border" />
              <TypeIcon className="h-3.5 w-3.5 text-primary" />
              <span className="h-px flex-1 bg-border" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <span className="mt-1 text-[11px] font-medium text-muted-foreground">Direct</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">{ticket.to}</p>
            <p className="text-xs text-muted-foreground">Arrival</p>
          </div>
        </div>

        {/* Perks */}
        <div className="mt-5 flex flex-wrap gap-2">
          {ticket.perks.map((perk) => (
            <span
              key={perk}
              className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              {perk}
            </span>
          ))}
        </div>

        <div
          className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${
            lowSeats ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          {lowSeats ? `Only ${ticket.seats} seats left` : `${ticket.seats} seats available`}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p>
              <span className="text-2xl font-bold text-foreground">${ticket.price}</span>
              <span className="text-sm text-muted-foreground"> / seat</span>
            </p>
          </div>
          <button className="group/btn inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90 active:scale-95">
            Book now
            <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketCard;