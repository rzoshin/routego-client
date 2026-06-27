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
import { updateTicketAdvertise } from "@/lib/api/tickets/action";

export default function AdminAdvertiseTable({ tickets = [], advertisedCount = 0 }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);
  const maxAds = 6;

  const handleAdvertise = async (id, isAdvertised) => {
    if (isAdvertised && advertisedCount >= maxAds) {
      toast.error(`Maximum ${maxAds} advertised tickets allowed`);
      return;
    }

    try {
      setLoadingId(id);
      const result = await updateTicketAdvertise(id, isAdvertised);

      if (result?.success) {
        toast.success(isAdvertised ? "Ticket advertised" : "Advertisement removed");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update advertisement");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="rounded-2xl border border-border bg-card p-6 shadow-xl">
      <p className="mb-4 text-sm text-muted-foreground">
        Featured on homepage: {advertisedCount} / {maxAds}
      </p>
      <div className="overflow-x-auto">
        <Table aria-label="Advertise tickets table">
          <TableContent>
            <TableHeader className="rounded-t-xl border-b border-border bg-background/40">
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                TICKET
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
                <p className="py-10 text-center font-medium">
                  No approved tickets available.
                </p>
              }
            >
              {tickets.map((ticket) => {
                const isAdvertised = Boolean(ticket.isAdvertised);

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
                    <TableCell className="px-6 py-4 align-middle text-sm">
                      {ticket.from} → {ticket.to}
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle font-semibold text-green-600">
                      BDT {Number(ticket.price || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      <Chip
                        size="sm"
                        className={`border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          isAdvertised
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-border bg-secondary text-muted-foreground"
                        }`}
                      >
                        {isAdvertised ? "Advertised" : "Not featured"}
                      </Chip>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      <Button
                        size="sm"
                        className={
                          isAdvertised
                            ? "border border-red-500/30 bg-red-500/20 text-red-400"
                            : "border border-primary/30 bg-primary/20 text-primary"
                        }
                        isLoading={loadingId === ticket._id}
                        onPress={() => handleAdvertise(ticket._id, !isAdvertised)}
                      >
                        {isAdvertised ? "Remove" : "Advertise"}
                      </Button>
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
