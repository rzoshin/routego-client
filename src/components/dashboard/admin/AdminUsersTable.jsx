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
import { updateUserFraud, updateUserRole } from "@/lib/api/users/action";

const roleStyles = {
  user: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  vendor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  admin: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function AdminUsersTable({ users = [] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const handleRoleChange = async (id, role) => {
    try {
      setLoadingId(id);
      const result = await updateUserRole(id, role);

      if (result?.success) {
        toast.success("Role updated");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update role");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const handleFraudToggle = async (id, isFraud) => {
    try {
      setLoadingId(id);
      const result = await updateUserFraud(id, isFraud);

      if (result?.success) {
        toast.success(isFraud ? "Vendor marked as fraud" : "Fraud flag removed");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update fraud status");
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
        <Table aria-label="Admin users table">
          <TableContent>
            <TableHeader className="rounded-t-xl border-b border-border bg-background/40">
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                USER
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                ROLE
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                FRAUD
              </TableColumn>
              <TableColumn className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                ACTIONS
              </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={
                <p className="py-10 text-center font-medium">No users found.</p>
              }
            >
              {users.map((user) => {
                const role = user.role || "user";
                const isVendor = role === "vendor";

                return (
                  <TableRow
                    key={user._id}
                    className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/5"
                  >
                    <TableCell className="px-6 py-4 align-middle">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      <Chip
                        size="sm"
                        className={`border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${roleStyles[role] || roleStyles.user}`}
                      >
                        {role}
                      </Chip>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      {isVendor ? (
                        <Chip
                          size="sm"
                          className={`border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            user.isFraud
                              ? "border-red-500/20 bg-red-500/10 text-red-400"
                              : "border-green-500/20 bg-green-500/10 text-green-400"
                          }`}
                        >
                          {user.isFraud ? "Fraud" : "Clear"}
                        </Chip>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4 align-middle">
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          aria-label="Change role"
                          value={role}
                          disabled={loadingId === user._id}
                          onChange={(e) => {
                            const nextRole = e.target.value;
                            if (nextRole && nextRole !== role) {
                              handleRoleChange(user._id, nextRole);
                            }
                          }}
                          className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                        >
                          <option value="user">User</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
                        </select>
                        {isVendor && (
                          <Button
                            size="sm"
                            className={
                              user.isFraud
                                ? "border border-green-500/30 bg-green-500/20 text-green-400"
                                : "border border-red-500/30 bg-red-500/20 text-red-400"
                            }
                            isLoading={loadingId === user._id}
                            onPress={() => handleFraudToggle(user._id, !user.isFraud)}
                          >
                            {user.isFraud ? "Clear Fraud" : "Mark Fraud"}
                          </Button>
                        )}
                      </div>
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
