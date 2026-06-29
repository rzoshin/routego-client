import { Suspense } from "react";
import InspirationBanner from "@/components/tickets/InspirationBanner";
import FilterPanel from "@/components/tickets/FilterPanel";
import TicketsBrowser from "@/components/tickets/TicketsBrowser";

export default function TicketsPage({ searchParams }) {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            Loading...
          </div>
        }
      >
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <Suspense
          fallback={
            <div className="flex justify-center py-10">
              Loading...
            </div>
          }
        >
          <FilterPanel />
        </Suspense>
      </div>

      <TicketsBrowser searchParams={searchParams} />
      <InspirationBanner />
    </main>
  );
}
