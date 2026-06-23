'use client'

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: This is a hybrid component.
//
// The HERO / SEARCH UI is client-side (state for tabs, controlled inputs).
// The TICKET FETCH is triggered by a router.push() that changes searchParams,
// so the server component (TicketsBrowser) re-renders with the new URL.
//
// Typical usage in app/page.jsx:
//
//   import SearchPage from '@/components/SearchPage'
//   export default async function Page({ searchParams }) {
//     return <SearchPage searchParams={searchParams} />
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

import { Suspense, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  MapPin, Calendar, Search, Users, ArrowLeftRight,
  Bus, TrainFront, Ship, Plane, LayoutGrid,
} from 'lucide-react'
import { Card } from '@heroui/react'
import { fetchTickets } from '@/lib/api/tickets/data'
import FilterPanel from './FilterPanel'
import TicketCard from './TicketCard'

// ── Transport tab config ──────────────────────────────────────────────────────
const TRANSPORT_TABS = [
  { label: 'All',    icon: LayoutGrid },
  { label: 'Bus',    icon: Bus        },
  { label: 'Train',  icon: TrainFront },
  { label: 'Launch', icon: Ship       },
  { label: 'Flight', icon: Plane      },
]

// ── SearchHero (client) ───────────────────────────────────────────────────────
function SearchHero() {
  const router       = useRouter()
  const rawParams    = useSearchParams()

  const [activeTab, setActiveTab] = useState(
    rawParams.get('transportType') || 'All'
  )
  const [from,   setFrom]   = useState(rawParams.get('from') || '')
  const [to,     setTo]     = useState(rawParams.get('to')   || '')
  const [date,   setDate]   = useState(rawParams.get('date') || '')
  const [pax,    setPax]    = useState(rawParams.get('pax')  || '1')

  const swapCities = useCallback(() => {
    setFrom(to)
    setTo(from)
  }, [from, to])

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (activeTab && activeTab !== 'All') params.set('transportType', activeTab)
    if (from) params.set('from', from)
    if (to)   params.set('to',   to)
    if (date) params.set('date', date)
    if (pax)  params.set('pax',  pax)
    router.push(`?${params.toString()}`)
  }, [activeTab, from, to, date, pax, router])

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-grid">
      <div className="absolute inset-0 bg-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Heading */}
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
          {/* Transport tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-secondary/60 p-1.5">
            {TRANSPORT_TABS.map(({ label, icon: Icon }) => {
              const isActive = activeTab === label
              return (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition md:flex-none md:px-5 ${
                    isActive
                      ? 'bg-card text-primary shadow-premium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              )
            })}
          </div>

          {/* Search fields */}
          <div className="mt-2 grid grid-cols-1 gap-2 p-1 md:grid-cols-12 md:items-end">
            {/* From / To */}
            <div className="relative md:col-span-6">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <SearchField
                  icon={MapPin}
                  label="From"
                  placeholder="Departure city"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                />
                <SearchField
                  icon={MapPin}
                  label="To"
                  placeholder="Destination city"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
              </div>
              {/* Swap button */}
              <button
                aria-label="Swap departure and destination"
                onClick={swapCities}
                className="absolute left-1/2 top-9 hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-premium transition hover:text-primary sm:flex"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            {/* Date */}
            <div className="md:col-span-3">
              <SearchField
                icon={Calendar}
                label="Date"
                placeholder="Departure date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>

            {/* Passengers */}
            <div className="md:col-span-3">
              <div className="flex flex-col gap-1.5">
                <label className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Passengers
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
                  <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <select
                    value={pax}
                    onChange={e => setPax(e.target.value)}
                    className="w-full bg-transparent text-sm font-medium text-foreground outline-none"
                    aria-label="Number of passengers"
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

          {/* Search button */}
          <div className="p-1 pt-2">
            <button
              onClick={handleSearch}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90 active:scale-[0.99]"
            >
              <Search className="h-5 w-5" />
              Search tickets
            </button>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {['Free cancellation on most routes', 'No hidden booking fees', 'Instant e-tickets'].map(text => (
            <span key={text} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SearchField helper ────────────────────────────────────────────────────────
function SearchField({ icon: Icon, label, placeholder, type = 'text', value, onChange }) {
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
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}

// ── TicketsBrowser (async server component) ───────────────────────────────────
// Keep this as a separate async server component in your project:
// components/TicketsBrowser.jsx
//
// export default async function TicketsBrowser({ searchParams }) { ... }
//
// Then import it in the page and pass searchParams down. Below is the JSX
// you'd render inside the page after the hero.

// ── Full page export ──────────────────────────────────────────────────────────
// In Next.js App Router, your page.jsx would look like:
//
//   import SearchHeroClient from '@/components/SearchPage'   ← this file
//   import TicketsBrowser   from '@/components/TicketsBrowser'
//
//   export default async function Page({ searchParams }) {
//     return (
//       <>
//         <SearchHeroClient />
//         <TicketsBrowser searchParams={searchParams} />
//       </>
//     )
//   }
//
// Because SearchHeroClient uses useRouter / useSearchParams, it must be
// 'use client'. TicketsBrowser is async, so it stays a server component.

export default SearchHero
