"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal } from "@heroui/react";
import { CreditCard, Lock } from "lucide-react";
import { isDeparturePassed } from "@/lib/parseDepartureDateTime";

export default function PaymentModal({
  isOpen,
  onClose,
  booking,
  userEmail,
}) {
  const [loading, setLoading] = useState(false);

  const quantity = Number(booking?.quantity) || 1;
  const totalPrice = Number(booking?.totalPrice) || 0;
  const unitPrice = quantity > 0 ? totalPrice / quantity : 0;
  const departurePassed = isDeparturePassed(
    booking?.departureDate,
    booking?.departureTime
  );
  const canPay =
    booking?.bookingStatus === "accepted" && !departurePassed && Boolean(userEmail);

  const handlePay = async () => {
    if (!canPay) {
      toast.error(
        departurePassed
          ? "Payment unavailable — departure time has passed"
          : "This booking cannot be paid right now"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: String(booking._id),
          userEmail,
        }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      toast.error(data?.error || data?.message || "Failed to start payment");
    } catch (error) {
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Complete Payment</h2>
              </div>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="rounded-xl border border-border bg-background/50 p-4">
                <p className="text-sm text-muted-foreground">Ticket</p>
                <p className="font-semibold">{booking?.ticketTitle}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    Unit price: BDT {unitPrice.toLocaleString()} × {quantity}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    Total: BDT {totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                You will be redirected to Stripe to complete payment securely.
              </div>

              {departurePassed ? (
                <p className="text-xs text-destructive">
                  Payment unavailable — departure time has passed.
                </p>
              ) : null}
            </div>

            <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
              <Button variant="bordered" onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-primary font-semibold text-primary-foreground"
                isLoading={loading}
                isDisabled={!canPay}
                onPress={handlePay}
              >
                Pay BDT {totalPrice.toLocaleString()}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
