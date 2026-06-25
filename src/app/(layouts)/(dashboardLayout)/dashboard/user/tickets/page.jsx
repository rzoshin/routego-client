import DashboardHeading from "@/components/dashboard/DashboardHeading";
import BookingsGrid from "@/components/dashboard/user/BookingsGrid";
import { fetchMyBooking } from "@/lib/api/bookings/data";
import { getUser } from "@/lib/api/session";

const UserTicketsPage = async () => {
  const user = await getUser();
  const bookings = await fetchMyBooking(user?.email);

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="My Booked Tickets"
        description="Track your booking requests, payments, and departures."
      />

      <BookingsGrid bookings={Array.isArray(bookings) ? bookings : []} />
    </div>
  );
};

export default UserTicketsPage;
