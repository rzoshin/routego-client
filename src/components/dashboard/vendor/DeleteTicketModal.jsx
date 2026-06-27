"use client";

import { useState } from "react";
import { deleteTicket } from "@/lib/api/tickets/action";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const DeleteTicketModal = ({ ticketId, disabled = false }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTicket = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteTicket(ticketId);

      if (res?.deletedCount > 0 || res?.success) {
        toast.success("Ticket deleted successfully");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete ticket");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        radius="full"
        isDisabled={disabled}
        className="h-8 w-8 min-w-0 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
        onPress={() => setIsOpen(true)}
      >
        <FaTrash size={12} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="rounded-3xl border border-border bg-card shadow-2xl">
              <div className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <FaTrashAlt size={24} />
                </div>

                <h3 className="text-xl font-bold text-foreground">Delete Ticket</h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  This action cannot be undone. The ticket will be permanently
                  removed.
                </p>

                <div className="mt-8 flex justify-center gap-3">
                  <Button variant="bordered" onPress={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    isLoading={isDeleting}
                    onPress={handleDeleteTicket}
                  >
                    Delete Ticket
                  </Button>
                </div>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default DeleteTicketModal;
