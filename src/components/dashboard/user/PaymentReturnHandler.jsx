"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentReturnHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handledRef = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId || handledRef.current) return;

    handledRef.current = true;

    const confirmPayment = async () => {
      try {
        const res = await fetch("/api/stripe/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok && data?.success) {
          window.dispatchEvent(
            new CustomEvent("routego:payment-success", { detail: data })
          );
          toast.success("Payment successful! Your booking is now paid.");
          router.replace("/dashboard/user/tickets");
          router.refresh();
          return;
        }

        toast.error(data?.error || data?.message || "Payment confirmation failed");
        router.replace("/dashboard/user/tickets");
      } catch (error) {
        toast.error(error.message || "Payment confirmation failed");
        router.replace("/dashboard/user/tickets");
      }
    };

    confirmPayment();
  }, [searchParams, router]);

  return null;
}
