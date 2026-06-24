import Link from "next/link";
import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from "@heroui/react";

// 
// _id
// 6a3aad756fa90b8eb5512135
// ticketId
// "6a3a744e2281937638a8684f"
// ticketTitle
// "Bus Trip"
// quantity
// 1
// totalPrice
// 350
// userEmail
// "user@gmail.com"
// userName
// "User"
// vendorEmail
// "vendor@gmail.com"
// bookingStatus
// "pending"
// paymentStatus
// "pending"
// createdAt
// "2026-06-23T15:59:48.899Z"
const BookingsTable = ({ bookings }) => {
  // console.log(bookings);

  return (
    <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
      <div className="p-0 overflow-x-auto">
        <Table aria-label="My Bookings Table" removeWrapper>
          <TableContent>
            <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20" isRowHeader>TICKET NAME</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">DATE</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">QUANTITY</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">TOTAL PAID</TableColumn>
              <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<p className="text-slate-500 py-10 text-center font-medium">No ticket passes booked yet. Explore Browse Events!</p>}>
              {bookings.map((booking) => (
                <TableRow key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0">
                  <TableCell className="py-4 px-6 align-middle font-bold text-white">
                    <Link href={`/events/${booking.eventId}`} className="hover:text-pink-500 hover:underline">
                      {booking.ticketTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">{booking.quantity} ticket(s)</TableCell>
                  <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">${Number(booking.totalPrice)?.toFixed(2)}</TableCell>
                  <TableCell className="py-4 px-6 align-middle">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={booking.paymentStatus === "failed" ? "danger" : "success"}
                      className="font-bold uppercase text-[10px] tracking-wider border border-white/5 px-2"
                    >
                      {booking.paymentStatus}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContent>
        </Table>
      </div>
    </Card>
  );
};

export default BookingsTable;
