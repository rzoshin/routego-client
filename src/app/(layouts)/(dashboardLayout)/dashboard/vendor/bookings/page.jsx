import React from 'react';
import DashboardHeading from '@/components/dashboard/DashboardHeading';
import { fetchVendorBooking } from '@/lib/api/bookings/data';
import BookingsTable from '@/components/dashboard/user/BookingsTable';
import { getUser } from "@/lib/api/session";

const VendorBookings = async () => {
    const user = await getUser();

    const bookings = await fetchVendorBooking(user?.email);
    return (
        <div>
            <DashboardHeading 
            title="Requested Bookings"
            description="" />

            <BookingsTable bookings={bookings} />
        </div>
    );
};

export default VendorBookings;