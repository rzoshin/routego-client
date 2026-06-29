"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button, Input, Modal } from "@heroui/react";
import { CreditCard, Lock } from "lucide-react";
import { completePayment } from "@/lib/api/payments/action";

const TEST_CARD = "4242424242424242";

export default function PaymentModal({ isOpen, onClose, booking, userEmail }) {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState(TEST_CARD);
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("123");
  const [loading, setLoading] = useState(false);

  const handlePay =  () => {
    const purchase = async () => {
      const res = fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    
    const data = await res.json();
    if(data?.url) {
      window.location.href = data.url;
    }
  };
  try {
    purchase();
  } catch (error) {
    toast.error(error.message || "Payment failed");
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
                <p className="mt-2 text-lg font-bold text-green-600">
                  BDT {Number(booking?.totalPrice || 0).toLocaleString()}
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Demo payment — use test card <strong>4242 4242 4242 4242</strong>
              </p>

              <Input
                label="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
                <Input
                  label="CVC"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                Secured with mock payment gateway (no real charges)
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
              <Button variant="bordered" onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-primary font-semibold text-primary-foreground"
                isLoading={loading}
                onPress={handlePay}
              >
                Pay BDT {Number(booking?.totalPrice || 0).toLocaleString()}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
}