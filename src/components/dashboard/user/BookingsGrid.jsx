"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingCard from "./BookingCard";

export default function BookingsGrid({ bookings = [] }) {
  const router = useRouter();
  const [bookingList, setBookingList] = useState(
    Array.isArray(bookings) ? bookings : []
  );

  useEffect(() => {
    setBookingList(Array.isArray(bookings) ? bookings : []);
  }, [bookings]);

  useEffect(() => {
    const handlePaymentSuccess = (event) => {
      const { bookingId, transactionId, paidAt } = event.detail || {};
      if (!bookingId) return;

      setBookingList((prev) =>
        prev.map((booking) =>
          String(booking._id) === String(bookingId)
            ? {
                ...booking,
                bookingStatus: "paid",
                paymentStatus: "paid",
                transactionId: transactionId || booking.transactionId,
                paidAt: paidAt || booking.paidAt,
              }
            : booking
        )
      );
      router.refresh();
    };

    window.addEventListener("routego:payment-success", handlePaymentSuccess);
    return () => {
      window.removeEventListener("routego:payment-success", handlePaymentSuccess);
    };
  }, [router]);

  if (!bookingList.length) {
    return (
      <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-12 text-center">
        <p className="text-lg font-semibold">No booked tickets yet</p>
        <p className="mt-2 text-sm">
          Browse available routes and book your first ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {bookingList.map((booking) => (
        <BookingCard
          key={String(booking._id)}
          booking={booking}
        />
      ))}
    </div>
  );
}
