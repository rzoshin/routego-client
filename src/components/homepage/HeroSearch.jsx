"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Calendar,
  Bus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

const LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

export default function HeroSearch() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [transportType, setTransportType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    if (transportType) params.set("transportType", transportType);
    router.push(`/tickets?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-1.5 backdrop-blur-md shadow-2xl">
        <div className="rounded-xl bg-white dark:bg-card p-5 md:p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-left">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                From
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground"
                >
                  <option value="">Select city</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-left">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                To
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground"
                >
                  <option value="">Select city</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-left">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Departure
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Transport
              </label>
              <div className="relative">
                <Bus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-background/80 py-2.5 pl-9 pr-3 text-sm text-foreground"
                >
                  <option value="">All Types</option>
                  {TRANSPORT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <Button
              onClick={handleSearch}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground"
            >
              <Search className="h-4 w-4" />
              Search Tickets
            </Button>
            <Link
              href="/tickets"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background/60 px-6 py-3 font-medium text-foreground"
            >
              Explore Routes
              <ArrowRight className="h-4 w-4 opacity-60" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
