import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AdminTicketsTable from "@/components/dashboard/admin/AdminTicketsTable";
import { fetchAdminTickets } from "@/lib/api/tickets/data";

const ManageTickets = async () => {
  const tickets = (await fetchAdminTickets()) || [];

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="Manage Tickets"
        description="Review vendor submissions and approve or reject tickets."
      />
      <AdminTicketsTable tickets={Array.isArray(tickets) ? tickets : []} />
    </div>
  );
};

export default ManageTickets;
