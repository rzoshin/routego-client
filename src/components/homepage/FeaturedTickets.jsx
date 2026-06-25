import HomeTicketSection from "@/components/homepage/HomeTicketSection";
import {
  fetchFeaturedTickets,
  fetchLatestTickets,
} from "@/lib/api/tickets/data";

export default async function FeaturedTickets() {
  const [advertisedTickets, latestTickets] = await Promise.all([
    fetchFeaturedTickets(),
    fetchLatestTickets(),
  ]);

  return (
    <>
      <HomeTicketSection
        eyebrow="Advertisement"
        title="Featured routes picked for you"
        description="Admin-selected departures across bus, train, flight, and launch."
        tickets={Array.isArray(advertisedTickets) ? advertisedTickets : []}
        emptyMessage="No advertised tickets yet. Check back soon."
      />
      <HomeTicketSection
        eyebrow="Latest"
        title="Recently added tickets"
        description="Freshly listed routes ready to explore and book."
        tickets={Array.isArray(latestTickets) ? latestTickets : []}
        emptyMessage="No tickets available yet."
      />
    </>
  );
}
