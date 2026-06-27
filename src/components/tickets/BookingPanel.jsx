"use client";

// app/tickets/[id]/BookingPanel.jsx
// Sticky booking sidebar — client component (quantity state, booking action)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Users, CreditCard, ChevronRight } from "lucide-react";
import { Input, Modal, Button } from "@heroui/react";
import { addBooking } from "@/lib/api/bookings/action";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function BookingPanel({ ticket }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const price = ticket.price ?? 0;
  const availableSeats =
    ticket.availableSeats ?? ticket.quantity - (ticket.bookedSeats || 0);
  const maxQty = availableSeats;
  const total = price * qty;
  const currency = "BDT"; // change to '$' if you prefer

  const departureDateTime = new Date(
    `${ticket.departureDate} ${ticket.departureTime}`,
  );



  const isSoldOut = availableSeats <= 0;
  const isExpired = departureDateTime < new Date();

  const handleOpenBooking = () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/tickets/${ticket._id}`);
      return;
    }
    setIsOpen(true);
  };

  const handleBookTicket = async () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/tickets/${ticket._id}`);
      return;
    }

    try {
      setLoading(true);

      if (qty > availableSeats) {
        toast.error("Booking quantity cannot exceed available seats");
        return;
      }
      const bookingData = {
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        ticketImage: ticket.image,
        from: ticket.from,
        to: ticket.to,
        departureDate: ticket.departureDate || ticket.date,
        departureTime: ticket.departureTime || "",
        quantity: qty,
        totalPrice: qty * ticket.price,
        userEmail: session.user.email,
        userName: session.user.name,
        vendorEmail: ticket.vendorEmail,
        bookingStatus: "pending",
        paymentStatus: "pending",
      };
      const result = await addBooking(bookingData);

      if (result.insertedId) {
        toast.success("Booking successful");
        setIsOpen(false);

        router.push("/dashboard/user/tickets");
        router.refresh();
      }
    } catch (error) {
      toast.error("Booking failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Price header */}
      <div className="bg-primary px-6 py-5 text-primary-foreground">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
          Price per seat
        </p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight">
          {currency} {price.toLocaleString()}
        </p>
      </div>

      {/* Seats left indicator */}
      <div className="flex items-center gap-2 border-b border-border px-6 py-3">
        <Users className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          <span className="font-bold text-primary">{availableSeats}</span>
        </span>
      </div>

      {/* Quantity selector */}
      <div className="px-6 py-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Passengers
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-8 text-center text-lg font-bold text-foreground">
            {qty}
          </span>

          <button
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
            disabled={qty >= maxQty}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Price breakdown */}
        <div className="mt-5 space-y-2 rounded-xl bg-secondary p-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>
              {currency} {price.toLocaleString()} × {qty} seat
              {qty > 1 ? "s" : ""}
            </span>
            <span>
              {currency} {(price * qty).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Booking fee</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">
              {currency} {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Book button */}
        <button
          onClick={handleOpenBooking}
          disabled={loading || isExpired || isSoldOut}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 active:scale-[0.99] disabled:opacity-70"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <CreditCard className="h-5 w-5" />
              {isExpired
                ? "Ticket Expired"
                : isSoldOut
                  ? "Sold Out"
                  : "Book Now"}
              <ChevronRight className="h-4 w-4 opacity-70" />
            </>
          )}
        </button>
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <h1>Book Ticket</h1>
                <Input
                  type="number"
                  min={1}
                  max={availableSeats}
                  value={qty}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value < 1) {
                      setQty(1);
                    } else if (value > availableSeats) {
                      setQty(availableSeats);
                    } else {
                      setQty(value);
                    }
                  }}
                />

                <p>
                  Available Seats:
                  {availableSeats}
                </p>

                <p>Total: BDT {(qty * price).toLocaleString()}</p>

                <Button
                  color="danger"
                  variant="light"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>

                <Button color="primary" onClick={handleBookTicket}>
                  Confirm Booking
                </Button>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Secure mock payment · Instant e-ticket
        </p>
      </div>
    </div>
  );
}
