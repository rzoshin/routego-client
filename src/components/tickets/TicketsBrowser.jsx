import { Suspense } from "react";
import { fetchTickets } from "@/lib/api/tickets/data";
import TicketCard from "./TicketCard";
import TicketsPagination from "./TicketsPagination";

export default async function TicketsBrowser({ searchParams }) {
  const sParams = await searchParams;

  const params = new URLSearchParams();
  if (sParams.search) params.set("search", sParams.search);
  if (sParams.transportType) params.set("transportType", sParams.transportType);
  if (sParams.from) params.set("from", sParams.from);
  if (sParams.to) params.set("to", sParams.to);
  if (sParams.date) params.set("date", sParams.date);
  if (sParams.sort) params.set("sort", sParams.sort);
  if (sParams.page) params.set("page", sParams.page);
  if (sParams.limit) params.set("limit", sParams.limit);

  const data = await fetchTickets(params);
  const tickets = data?.tickets ?? [];
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.page ?? 1;
  const total = data?.total ?? 0;

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto w-full space-y-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {tickets.length} of {total} approved tickets
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <p className="text-2xl font-semibold text-foreground">No tickets found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or choosing different filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} buttonText="See details" />
          ))}
        </div>
      )}

      <Suspense fallback= "Loading...">
        <TicketsPagination totalPages={totalPages} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
