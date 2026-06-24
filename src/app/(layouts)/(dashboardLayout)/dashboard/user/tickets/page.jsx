import DashboardHeading from '@/components/dashboard/DashboardHeading';
import BookingsTable from "@/components/dashboard/user/BookingsTable";
import React from 'react';
import { fetchMyBooking } from "@/lib/api/bookings/data";
import { getUser } from "@/lib/api/session";

const UserTicketsPage = async () => {
    const user = await getUser();

    const bookings = await fetchMyBooking(user?.email);
    // console.log(bookings);
    return (
        <div>
            <DashboardHeading 
            title="My Booked Tickets"
            description="" />

        <BookingsTable bookings={bookings} />
        </div>
    );
};

export default UserTicketsPage;