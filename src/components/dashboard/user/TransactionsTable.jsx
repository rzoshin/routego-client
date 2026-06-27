"use client";

import {
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

export default function TransactionsTable({ transactions = [] }) {
  return (
    <Card className="rounded-2xl border border-border bg-card p-6 shadow-xl">
      <div className="overflow-x-auto">
        <Table aria-label="Transactions table">
          <TableContent>
            <TableHeader className="rounded-t-xl border-b border-border bg-background/40">
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                TICKET
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                AMOUNT
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                TRANSACTION ID
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                DATE
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                STATUS
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <p className="py-10 text-center font-medium">No transactions yet.</p>
              }
            >
              {transactions.map((txn) => (
                <TableRow
                  key={txn._id || txn.transactionId}
                  className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/5"
                >
                  <TableCell className="px-6 py-4 align-middle font-medium">
                    {txn.ticketTitle}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-middle font-semibold text-green-600">
                    BDT {Number(txn.amount || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-middle font-mono text-xs text-muted-foreground">
                    {txn.transactionId}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-middle text-sm">
                    {txn.paidAt
                      ? new Date(txn.paidAt).toLocaleString()
                      : txn.createdAt
                        ? new Date(txn.createdAt).toLocaleString()
                        : "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4 align-middle">
                    <Chip
                      size="sm"
                      className="border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-400"
                    >
                      {txn.paymentStatus || "paid"}
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
}
