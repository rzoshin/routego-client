import HomeTicketSection from "@/components/homepage/HomeTicketSection";

export default function FeaturedTickets({
  advertisedTickets = [],
  latestTickets = [],
}) {
  return (
    <>
      <HomeTicketSection
        eyebrow="Advertisement"
        title="Featured routes picked for you"
        description="Admin-selected departures across bus, train, flight, and launch."
        tickets={advertisedTickets}
        emptyMessage="No advertised tickets yet. Approve tickets in Manage Tickets, then feature them in Advertise Tickets."
      />
      <HomeTicketSection
        eyebrow="Latest"
        title="Recently added tickets"
        description="Freshly listed routes ready to explore and book."
        tickets={latestTickets}
        emptyMessage="No tickets available yet."
      />
    </>
  );
}
