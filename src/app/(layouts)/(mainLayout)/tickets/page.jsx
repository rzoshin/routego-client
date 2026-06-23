import InspirationBanner from "@/components/tickets/InspirationBanner"
import SearchHero from "@/components/tickets/SearchHero"
import TicketsBrowser from "@/components/tickets/TicketsBrowser"


export const metadata = {
  title: 'All Tickets - RouteGo',
  description: 'Search, filter, and compare Bus, Train, Launch, and Flight tickets on RouteGo.',
}

export default function TicketsPage({ searchParams }) {
  return (
    <main>
      <SearchHero />
      <TicketsBrowser searchParams={searchParams} />
      <InspirationBanner />
    </main>
  )
}
