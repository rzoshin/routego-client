'use client'

import { useState } from 'react'
import { MapPin, Calendar, Search, Users, ArrowLeftRight, Bus, TrainFront, Ship, Plane, LayoutGrid } from 'lucide-react'

const transportTabs = [
  { label: 'All', icon: LayoutGrid },
  { label: 'Bus', icon: Bus },
  { label: 'Train', icon: TrainFront },
  { label: 'Launch', icon: Ship },
  { label: 'Flight', icon: Plane },
]

const SearchHero = () => {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-grid">
      <div className="absolute inset-0 bg-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Find your journey
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground text-balance md:text-6xl">
            Compare every route, book in seconds
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
            Search and compare Bus, Train, Launch, and Flight tickets across the country, all in one place.
          </p>
        </div>

        {/* Floating search container */}
        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-border bg-card/95 p-2 shadow-premium-lg backdrop-blur-md md:p-3">
          {/* Transport segmented tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-secondary/60 p-1.5">
            {transportTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.label
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition md:flex-none md:px-5 ${
                    isActive
                      ? 'bg-card text-primary shadow-premium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Search fields */}
          <div className="mt-2 grid grid-cols-1 gap-2 p-1 md:grid-cols-12 md:items-end">
            <div className="relative md:col-span-6">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <SearchField icon={MapPin} label="From" placeholder="Departure city" />
                <SearchField icon={MapPin} label="To" placeholder="Destination city" />
              </div>
              {/* Swap button */}
              <button
                aria-label="Swap departure and destination"
                className="absolute left-1/2 top-9 hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-premium transition hover:text-primary sm:flex"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
            <div className="md:col-span-3">
              <SearchField icon={Calendar} label="Date" placeholder="Departure date" type="date" />
            </div>
            <div className="md:col-span-3">
              <div className="flex flex-col gap-1.5">
                <label className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Passengers
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
                  <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <select
                    className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
                    aria-label="Number of passengers"
                    defaultValue="1"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4+ Passengers</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-1 pt-2">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90 active:scale-[0.99]">
              <Search className="h-5 w-5" />
              Search tickets
            </button>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Free cancellation on most routes
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            No hidden booking fees
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Instant e-tickets
          </span>
        </div>
      </div>
    </section>
  )
}

function SearchField({
  icon: Icon,
  label,
  placeholder,
  type = 'text',
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}

export default SearchHero;
