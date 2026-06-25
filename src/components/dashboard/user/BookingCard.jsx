"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, CreditCard } from "lucide-react";
import { Button, Chip } from "@heroui/react";
import Countdown from "@/components/shared/Countdown";
import toast from "react-hot-toast";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  accepted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  paid: "bg-green-500/10 text-green-400 border-green-500/20",
};

function isDeparturePassed(departureDate, departureTime) {
  const target = new Date(`${departureDate || ""} ${departureTime || "00:00"}`);
  return !Number.isNaN(target.getTime()) && target < new Date();
}

export default function BookingCard({ booking }) {
  const status = booking.bookingStatus || "pending";
  const showCountdown = status !== "rejected";
  const departurePassed = isDeparturePassed(
    booking.departureDate,
    booking.departureTime
  );
  const canPay = status === "accepted" && !departurePassed;

  const handlePayNow = () => {
    toast("Stripe payment will be enabled in Phase 6.", { icon: "ℹ️" });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
      <div className="relative h-44 w-full">
        <Image
          src={booking.ticketImage || "/bus-ticket.png"}
          alt={booking.ticketTitle}
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Chip
          size="sm"
          className={`absolute left-4 top-4 font-bold uppercase text-[10px] tracking-wider border ${statusStyles[status] || statusStyles.pending}`}
        >
          {status}
        </Chip>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-white">{booking.ticketTitle}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            {booking.from} → {booking.to}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-500">Quantity</p>
            <p className="font-semibold text-white">{booking.quantity}</p>
          </div>
          <div>
            <p className="text-slate-500">Total</p>
            <p className="font-semibold text-green-400">
              BDT {Number(booking.totalPrice || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Departure</p>
            <p className="font-semibold text-white">
              {booking.departureDate || "TBA"}
              {booking.departureTime ? ` · ${booking.departureTime}` : ""}
            </p>
          </div>
          <div>
            <p className="text-slate-500">Booked on</p>
            <p className="font-semibold text-white">
              {booking.createdAt
                ? new Date(booking.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {showCountdown && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Departure countdown
            </p>
            <Countdown
              departureDate={booking.departureDate}
              departureTime={booking.departureTime}
            />
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2">
          {canPay && (
            <Button
              onClick={handlePayNow}
              className="w-full bg-blue-600 text-white font-semibold"
              startContent={<CreditCard className="h-4 w-4" />}
            >
              Pay Now
            </Button>
          )}

          {status === "accepted" && departurePassed && (
            <p className="text-center text-xs text-red-400">
              Payment unavailable — departure time has passed.
            </p>
          )}

          <Link
            href={`/tickets/${booking.ticketId}`}
            className="text-center text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View ticket details
          </Link>
        </div>
      </div>
    </div>
  );
}
