import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TicketCard from "@/components/tickets/TicketCard";

export default function HomeTicketSection({
  eyebrow,
  title,
  description,
  tickets,
  emptyMessage,
}) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {eyebrow}
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
              {title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          </div>
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            View all tickets
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {tickets.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} buttonText="See details" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
