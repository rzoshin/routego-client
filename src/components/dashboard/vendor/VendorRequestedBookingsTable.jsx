"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableContent,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { updateBookingStatus } from "@/lib/api/bookings/action";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  accepted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  paid: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function VendorRequestedBookingsTable({ bookings = [] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      setLoadingId(bookingId);
      const result = await updateBookingStatus(bookingId, status);

      if (result?.success) {
        toast.success(`Booking ${status}`);
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update booking");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="border border-border bg-card/40 backdrop-blur-xl shadow-xl p-6 rounded-2xl">
      <div className="overflow-x-auto">
        <Table aria-label="Requested bookings table">
          <TableContent>
            <TableHeader className="bg-background/40 border-b border-border/5 rounded-t-xl">
              <TableColumn className="py-4 px-6 text-muted-foreground font-extrabold uppercase text-[11px] tracking-wider">
                USER
              </TableColumn>
              <TableColumn className="py-4 px-6 text-muted-foreground font-extrabold uppercase text-[11px] tracking-wider">
                TICKET
              </TableColumn>
              <TableColumn className="py-4 px-6 text-muted-foreground font-extrabold uppercase text-[11px] tracking-wider">
                QUANTITY
              </TableColumn>
              <TableColumn className="py-4 px-6 text-muted-foreground font-extrabold uppercase text-[11px] tracking-wider">
                TOTAL PRICE
              </TableColumn>
              <TableColumn className="py-4 px-6 text-muted-foreground font-extrabold uppercase text-[11px] tracking-wider">
                STATUS
              </TableColumn>
              <TableColumn className="py-4 px-6 text-muted-foreground font-extrabold uppercase text-[11px] tracking-wider">
                ACTIONS
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <p className="py-10 text-center font-medium">
                  No booking requests yet.
                </p>
              }
            >
              {bookings.map((booking) => {
                const status = booking.bookingStatus || "pending";
                const isPending = status === "pending";

                return (
                  <TableRow
                    key={booking._id}
                    className="border-b border-border/5 hover:bg-background/5 transition-colors last:border-b-0"
                  >
                    <TableCell className="py-4 px-6 align-middle">
                      <div>
                        <p className="font-semibold">
                          {booking.userName || "User"}
                        </p>
                        <p className="text-xs">
                          {booking.userEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle font-medium">
                      {booking.ticketTitle}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle">
                      {booking.quantity}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle font-semibold text-green-600">
                      BDT {Number(booking.totalPrice || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle">
                      <Chip
                        size="sm"
                        className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${statusStyles[status] || statusStyles.pending}`}
                      >
                        {status}
                      </Chip>
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle">
                      {isPending ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500/20 text-green-400 border border-green-500/30"
                            isLoading={loadingId === booking._id}
                            onPress={() =>
                              handleStatusUpdate(booking._id, "accepted")
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500/20 text-red-400 border border-red-500/30"
                            isDisabled={loadingId === booking._id}
                            onPress={() =>
                              handleStatusUpdate(booking._id, "rejected")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContent>
        </Table>
      </div>
    </Card>
  );
}
