import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import InspirationBanner from "@/components/tickets/InspirationBanner";
import SearchHero from "@/components/tickets/SearchHero";
import FilterPanel from "@/components/tickets/FilterPanel";
import TicketsBrowser from "@/components/tickets/TicketsBrowser";

export const metadata = {
  title: "All Tickets - RouteGo",
  description:
    "Search, filter, and compare Bus, Train, Launch, and Flight tickets on RouteGo.",
};

export default function TicketsPage({ searchParams }) {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        }
      >
        <SearchHero />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <Suspense
          fallback={
            <div className="flex justify-center py-10">
              <Spinner />
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
