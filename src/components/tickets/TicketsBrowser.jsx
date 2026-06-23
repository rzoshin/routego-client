// components/TicketsBrowser.jsx  — keep as server component (no 'use client')
import { Suspense } from 'react'
import { Card } from '@heroui/react'
import { fetchTickets } from '@/lib/api/tickets/data'
import FilterPanel from './FilterPanel'
import TicketCard from './TicketCard'

export default async function TicketsBrowser({ searchParams }) {
  const sParams = await searchParams

  const params = new URLSearchParams()
  if (sParams.search)        params.set('search',        sParams.search)
  if (sParams.transportType) params.set('transportType', sParams.transportType)
  if (sParams.from)          params.set('from',          sParams.from)
  if (sParams.to)            params.set('to',            sParams.to)
  if (sParams.date)          params.set('date',          sParams.date)
  if (sParams.pax)           params.set('pax',           sParams.pax)

  const tickets = await fetchTickets(params)

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto w-full space-y-12">

      {/* Results */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="bg-card/50 border border-border p-4 space-y-4 animate-pulse">
                <div className="h-48 rounded-xl bg-muted" />
                <div className="space-y-3">
                  <div className="h-4 w-3/5 rounded-lg bg-muted" />
                  <div className="h-6 w-4/5 rounded-lg bg-muted" />
                  <div className="h-4 w-2/5 rounded-lg bg-muted" />
                </div>
              </Card>
            ))}
          </div>
        }
      >
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <p className="text-2xl font-semibold text-foreground">No tickets found</p>
            <p className="text-muted-foreground text-sm">Try adjusting your search or choosing different dates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} buttonText="View Details" />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  )
}
