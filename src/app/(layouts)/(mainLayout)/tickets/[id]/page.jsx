import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, MapPin, Bus, TrainFront, Ship, Plane,
  Star, ShieldCheck, Zap, CheckCircle2,
  ArrowRight, Tag, Building2, Mail,
} from 'lucide-react'
  // client component below
import { baseURL } from "@/lib/api/baseUrl";
import Image from 'next/image';
import BookingPanel from '@/components/tickets/BookingPanel';

// ── Transport icon map ────────────────────────────────────────────────────────
const TRANSPORT_ICON = {
  Bus:    Bus,
  Train:  TrainFront,
  Launch: Ship,
  Flight: Plane,
}

const TRANSPORT_COLOR = {
  Bus:    'bg-amber-100 text-amber-700',
  Train:  'bg-emerald-100 text-emerald-700',
  Launch: 'bg-cyan-100 text-cyan-700',
  Flight: 'bg-violet-100 text-violet-700',
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending:  'bg-yellow-100 text-yellow-700 border-yellow-200',
    approved: 'bg-green-100  text-green-700  border-green-200',
    rejected: 'bg-red-100    text-red-700    border-red-200',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${map[status] ?? map.pending}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

// ── Perk chip ─────────────────────────────────────────────────────────────────
function PerkChip({ label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
      {label}
    </span>
  )
}

// ── Info row ──────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  )
}

const fetchTicketById = async (id) => {
    const res = await fetch(`${baseURL}/api/single-ticket/${id}`);
    const data = await res.json();
    return data;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function TicketDetailsPage({ params }) {
  const { id } = await params
  const ticket = await fetchTicketById(id)
  if (!ticket) notFound()

  const TransportIcon = TRANSPORT_ICON[ticket.transportType] ?? Bus
  const transportColor = TRANSPORT_COLOR[ticket.transportType] ?? TRANSPORT_COLOR.Bus

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* ── Breadcrumb / Back ───────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/tickets"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All Tickets
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-sm text-slate-500 truncate">{ticket.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── LEFT COLUMN — main content ──────────────────────────────── */}
          <div className="space-y-6 lg:col-span-2">

            {/* Hero image */}
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={ticket.image}
                alt={ticket.title}
                fill
                unoptimized
                className="h-72 w-full object-cover sm:h-80 md:h-96"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Transport badge (top-left) */}
              <div className="absolute left-4 top-4">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm ${transportColor}`}>
                  <TransportIcon className="h-4 w-4" />
                  {ticket.transportType}
                </span>
              </div>

              {/* Status (top-right) */}
              <div className="absolute right-4 top-4">
                <StatusBadge status={ticket.verificationStatus} />
              </div>

              {/* Route overlay (bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {ticket.title}
                </h1>
                <div className="mt-1 flex items-center gap-2 text-white/90">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-semibold">
                    {ticket.from}
                    <ArrowRight className="mx-2 inline h-3.5 w-3.5" />
                    {ticket.to}
                  </span>
                </div>
              </div>
            </div>

            {/* Route card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-base font-bold text-slate-900">Route Details</h2>
              </div>
              <div className="grid grid-cols-1 divide-y divide-slate-100 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">From</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{ticket.from}</p>
                  <div className="mt-1 flex items-center gap-1 text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-xs">Departure</span>
                  </div>
                </div>

                {/* Arrow divider */}
                <div className="relative hidden sm:flex sm:flex-col sm:items-center sm:justify-center">
                  <div className="absolute top-1/2 -left-5 -translate-y-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-100 bg-blue-600 shadow">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">To</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{ticket.to}</p>
                  <div className="mt-1 flex items-center gap-1 text-slate-400">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="text-xs">Destination</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks */}
            {ticket.perks?.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-bold text-slate-900">What&apos;s included</h2>
                <div className="flex flex-wrap gap-2">
                  {ticket.perks.map((perk) => (
                    <PerkChip key={perk} label={perk} />
                  ))}
                </div>
              </div>
            )}

            {/* Vendor info */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-base font-bold text-slate-900">Operated by</h2>
              </div>
              <div className="divide-y divide-slate-100 px-6">
                <InfoRow icon={Building2} label="Operator" value={ticket.vendorName} />
                <InfoRow icon={Mail}      label="Contact"  value={ticket.vendorEmail} />
                <InfoRow icon={Tag}       label="Ticket status" value={ticket.status ?? 'Available'} />
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: 'Secure Stripe payment' },
                { icon: Zap,         label: 'Instant confirmation'  },
                { icon: Star,        label: '4.9 avg. rating'       },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                    <Icon className="h-4.5 w-4.5 text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold leading-tight text-slate-700">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — booking panel ────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <BookingPanel ticket={ticket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}