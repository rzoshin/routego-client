import DashboardHeading from "@/components/dashboard/DashboardHeading";
import VendorRequestedBookingsTable from "@/components/dashboard/vendor/VendorRequestedBookingsTable";
import { fetchVendorBooking } from "@/lib/api/bookings/data";
import { getUser } from "@/lib/api/session";

const VendorBookings = async () => {
  const user = await getUser();
  const bookings = await fetchVendorBooking(user?.email);

  return (
    <div className="space-y-6">
      <DashboardHeading
        title="Requested Bookings"
        description="Accept or reject booking requests from travelers."
      />

      <VendorRequestedBookingsTable bookings={bookings || []} />
    </div>
  );
};

export default VendorBookings;
