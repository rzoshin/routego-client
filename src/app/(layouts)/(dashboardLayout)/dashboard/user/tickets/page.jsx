import DashboardHeading from "@/components/dashboard/DashboardHeading";
import BookingsGrid from "@/components/dashboard/user/BookingsGrid";
import PaymentReturnHandler from "@/components/dashboard/user/PaymentReturnHandler";
import { fetchMyBooking } from "@/lib/api/bookings/data";
import { getUser } from "@/lib/api/session";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const UserTicketsPage = async () => {
  const user = await getUser();
  const bookings = await fetchMyBooking(user?.email);

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <PaymentReturnHandler />
      </Suspense>
      <DashboardHeading
        title="My Booked Tickets"
        description="Track your booking requests, payments, and departures."
      />

      <BookingsGrid bookings={Array.isArray(bookings) ? bookings : []} />
    </div>
  );
};

export default UserTicketsPage;
