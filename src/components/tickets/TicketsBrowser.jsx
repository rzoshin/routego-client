'use client'

import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  MapPinOff,
  ArrowUpDown,
  LayoutGrid,
  Bus,
  TrainFront,
  Ship,
  Plane,
} from 'lucide-react'
import { tickets } from '@/lib/tickets-data'
import TicketCard from './TicketCard'

const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'departure-asc', label: 'Earliest Departure' },
  { value: 'seats-desc', label: 'Most Seats Available' },
]

const chipIcon = {
  All: LayoutGrid,
  Bus: Bus,
  Train: TrainFront,
  Launch: Ship,
  Flight: Plane,
}

const PAGE_SIZE = 6

const TicketsBrowser = () => {
  const [activeType, setActiveType] = useState<Filter>('All')
  const [sort, setSort] = useState<SortOption>('price-asc')
  const [minSeats, setMinSeats] = useState(0)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const result = tickets.filter((t) => {
      const typeMatch = activeType === 'All' || t.type === activeType
      const seatMatch = t.seats >= minSeats
      return typeMatch && seatMatch
    })

    result.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'seats-desc':
          return b.seats - a.seats
        case 'departure-asc':
          return a.departureMinutes - b.departureMinutes
        default:
          return 0
      }
    })
    return result
  }, [activeType, sort, minSeats])

  const lowestPrice = useMemo(
    () => (filtered.length ? Math.min(...filtered.map((t) => t.price)) : 0),
    [filtered],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const resetFilters = () => {
    setActiveType('All')
    setSort('price-asc')
    setMinSeats(0)
    setPage(1)
  }

  const changeType = () => {
    setActiveType(type)
    setPage(1)
  }

  return (
    <section className="bg-background pb-16 md:pb-24">
      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Type chips with icons */}
            <div className="flex flex-wrap items-center gap-2">
              {transportTypes.map((type) => {
                const isActive = activeType === type
                const Icon = chipIcon[type]
                return (
                  <button
                    key={type}
                    onClick={() => changeType(type)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-premium'
                        : 'border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {type}
                  </button>
                )
              })}
            </div>

            {/* Sort + seats */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <select
                  aria-label="Minimum available seats"
                  value={minSeats}
                  onChange={(e) => {
                    setMinSeats(Number(e.target.value))
                    setPage(1)
                  }}
                  className="bg-transparent text-sm font-medium text-foreground outline-none"
                >
                  <option value={0}>Any seats</option>
                  <option value={5}>5+ seats</option>
                  <option value={10}>10+ seats</option>
                  <option value={15}>15+ seats</option>
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <select
                  aria-label="Sort tickets"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent text-sm font-medium text-foreground outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Results header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {activeType === 'All' ? 'All available tickets' : `${activeType} tickets`}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'route' : 'routes'} found
              {filtered.length > 0 && (
                <>
                  {' '}· from{' '}
                  <span className="font-semibold text-foreground">${lowestPrice}</span> per seat
                </>
              )}
            </p>
          </div>
        </div>

        {/* Grid or empty state */}
        {paginated.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center shadow-premium">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <MapPinOff className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-foreground">No tickets match your filters</h3>
            <p className="mt-2 max-w-md text-muted-foreground text-pretty">
              Try adjusting your transport type or seat availability to discover more routes.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-premium transition hover:bg-primary/90"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-premium transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                    p === currentPage
                      ? 'bg-primary text-primary-foreground shadow-premium'
                      : 'border border-border bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-premium transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default TicketsBrowser;