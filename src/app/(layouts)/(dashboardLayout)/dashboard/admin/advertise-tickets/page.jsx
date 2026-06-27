import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AdminAdvertiseTable from "@/components/dashboard/admin/AdminAdvertiseTable";
import { fetchApprovedTickets } from "@/lib/api/tickets/data";

const AdvertiseTickets = async () => {
  const tickets = (await fetchApprovedTickets()) || [];
  const ticketList = Array.isArray(tickets) ? tickets : [];
  const advertisedCount = ticketList.filter((t) => t.isAdvertised).length;

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="Advertise Tickets"
        description="Feature approved tickets on the homepage (max 6)."
      />
      <AdminAdvertiseTable tickets={ticketList} advertisedCount={advertisedCount} />
    </div>
  );
};

export default AdvertiseTickets;
