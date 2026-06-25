import BookingCard from "./BookingCard";

export default function BookingsGrid({ bookings = [] }) {
  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl p-12 text-center">
        <p className="text-lg font-semibold text-white">No booked tickets yet</p>
        <p className="mt-2 text-sm text-slate-400">
          Browse available routes and book your first ticket.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
