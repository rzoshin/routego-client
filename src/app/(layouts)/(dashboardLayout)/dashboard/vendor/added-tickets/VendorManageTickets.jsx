"use client";

import DeleteTicketModal from "@/components/dashboard/vendor/DeleteTicketModal";
import EditTicketModal from "@/components/dashboard/vendor/EditTicketModal";
import { Card, Chip } from "@heroui/react";
import Image from "next/image";
import { MapPin } from "lucide-react";

const statusStyles = {
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const VendorManageTickets = ({ tickets = [] }) => {
  if (!tickets.length) {
    return (
      <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl p-10 rounded-2xl text-center">
        <p className="font-medium text-slate-500">
          You have not added any tickets yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tickets.map((ticket) => {
        const status = ticket.verificationStatus || "pending";
        const isRejected = status === "rejected";

        return (
          <Card
            key={ticket._id}
            className="overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          >
            <div className="relative h-44 w-full">
              <Image
                src={ticket.image || "/bus-ticket.png"}
                alt={ticket.title}
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

            <div className="space-y-4 p-5">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-1">
                  {ticket.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {ticket.from} → {ticket.to}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Transport</p>
                  <p className="font-semibold text-white">{ticket.transportType}</p>
                </div>
                <div>
                  <p className="text-slate-500">Departure</p>
                  <p className="font-semibold text-white">
                    {ticket.departureDate || "TBA"}
                    {ticket.departureTime ? ` · ${ticket.departureTime}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Price</p>
                  <p className="font-semibold text-green-400">
                    BDT {Number(ticket.price || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Seats</p>
                  <p className="font-semibold text-white">{ticket.quantity}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <EditTicketModal ticket={ticket} disabled={isRejected} />
                <DeleteTicketModal ticketId={ticket._id} disabled={isRejected} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default VendorManageTickets;
