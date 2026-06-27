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
import { updateTicketVerification } from "@/lib/api/tickets/action";

const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminTicketsTable({ tickets = [] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleVerification = async (id, status) => {
    try {
      setLoadingId(id);
      const result = await updateTicketVerification(id, status);

      if (result?.success) {
        toast.success(`Ticket ${status}`);
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update ticket");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="rounded-2xl border border-border bg-card p-6 shadow-xl">
      <div className="overflow-x-auto">
        <Table aria-label="Admin tickets table">
          <TableContent>
            <TableHeader className="rounded-t-xl border-b border-border bg-background/40">
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                TICKET
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                VENDOR
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                ROUTE
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                PRICE
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                STATUS
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                ACTIONS
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <p className="py-10 text-center font-medium">No tickets found.</p>
              }
            >
              {tickets.map((ticket) => {
                const status = ticket.verificationStatus || "pending";
                const isPending = status === "pending";

                return (
                  <TableRow
                    key={ticket._id}
                    className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/5"
                  >
                    <TableCell className="px-6 py-4 align-middle">
                      <div>
                        <p className="font-semibold">{ticket.title}</p>
                        <p className="text-xs capitalize text-muted-foreground">
                          {ticket.transportType}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      <p className="text-sm">{ticket.vendorEmail}</p>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle text-sm">
                      {ticket.from} → {ticket.to}
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle font-semibold text-green-600">
                      BDT {Number(ticket.price || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      <Chip
                        size="sm"
                        className={`border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyles[status] || statusStyles.pending}`}
                      >
                        {status}
                      </Chip>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      {isPending ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="border border-green-500/30 bg-green-500/20 text-green-400"
                            isLoading={loadingId === ticket._id}
                            onPress={() => handleVerification(ticket._id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            className="border border-red-500/30 bg-red-500/20 text-red-400"
                            isDisabled={loadingId === ticket._id}
                            onPress={() => handleVerification(ticket._id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
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
