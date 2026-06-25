import { Card } from "@heroui/react";

export default function ProfileStats({ stats }) {
  if (!stats) {
    return null;
  }

  const items =
    stats.role === "user"
      ? [
          { label: "Total Bookings", value: stats.totalBookings },
          { label: "Pending", value: stats.pending },
          { label: "Accepted", value: stats.accepted },
          { label: "Paid", value: stats.paid },
        ]
      : stats.role === "vendor"
        ? [
            { label: "Tickets Added", value: stats.ticketsAdded },
            { label: "Approved", value: stats.approvedTickets },
            { label: "Pending Requests", value: stats.pendingRequests },
            { label: "Revenue", value: `BDT ${stats.totalRevenue || 0}` },
          ]
        : [
            { label: "Total Users", value: stats.totalUsers },
            { label: "Pending Tickets", value: stats.pendingTickets },
            { label: "Advertised", value: stats.advertisedTickets },
          ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
