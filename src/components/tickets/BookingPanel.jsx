'use client'

// app/tickets/[id]/BookingPanel.jsx
// Sticky booking sidebar — client component (quantity state, booking action)

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Users, CreditCard, ChevronRight } from 'lucide-react'

export default function BookingPanel({ ticket }) {
  const router   = useRouter()
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

  const price    = ticket.price ?? 0
  const maxQty   = ticket.quantity ?? 10
  const total    = price * qty
  const currency = 'BDT'          // change to '$' if you prefer

  const handleBook = async () => {
    setLoading(true)
    // Replace with your Stripe / booking API call:
    // await createBooking({ ticketId: ticket._id, quantity: qty })
    router.push(`/checkout?ticketId=${ticket._id}&qty=${qty}`)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Price header */}
      <div className="bg-blue-600 px-6 py-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Price per seat</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight">
          {currency} {price.toLocaleString()}
        </p>
      </div>

      {/* Seats left indicator */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-3">
        <Users className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium text-slate-700">
          <span className="font-bold text-blue-600">{maxQty}</span> seats available
        </span>
      </div>

      {/* Quantity selector */}
      <div className="px-6 py-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Passengers
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-8 text-center text-lg font-bold text-slate-900">{qty}</span>

          <button
            onClick={() => setQty(q => Math.min(maxQty, q + 1))}
            disabled={qty >= maxQty}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Price breakdown */}
        <div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>{currency} {price.toLocaleString()} × {qty} seat{qty > 1 ? 's' : ''}</span>
            <span>{currency} {(price * qty).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Booking fee</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
            <span>Total</span>
            <span className="text-blue-600">{currency} {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Book button */}
        <button
          onClick={handleBook}
          disabled={loading}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:opacity-70"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              Book now
              <ChevronRight className="h-4 w-4 opacity-70" />
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-slate-400">
          Secure payment via Stripe · Instant e-ticket
        </p>
      </div>
    </div>
  )
}