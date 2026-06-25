"use client";

import { deleteTicket } from "@/lib/api/tickets/action";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const DeleteTicketModal = ({
  isDeleteOpen,
  setIsDeleteOpen,
  id,
}) => {
  const router = useRouter();

  const handleDeleteTicket = async () => {
    try {
      const res = await deleteTicket(id);

      if (res?.deletedCount > 0) {
        toast.success("Ticket deleted successfully");
        router.refresh();
        setIsDeleteOpen(false);
      } else {
        toast.error("Failed to delete ticket");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
    >
      <Button isIconOnly size="sm" radius="full" className="h-8 w-8 min-w-0 p-0 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-[1.03] transition-all duration-200"> <FaTrash size={12} /></Button>
      <Modal.Backdrop>

      <Modal.Container>
        <Modal.Dialog className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl">

          <div className="p-8 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              <FaTrashAlt size={24} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Delete Ticket
            </h3>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              This action cannot be undone.
              The ticket and all related data
              will be permanently removed.
            </p>

            <div className="flex justify-center gap-3 mt-8">

              <Button
                variant="bordered"
                slot="close"
              >
                Cancel
              </Button>

              <Button
                color="danger"
                onClick={handleDeleteTicket}
                slot="close"
              >
                Delete Ticket
              </Button>

            </div>
          </div>

        </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteTicketModal;