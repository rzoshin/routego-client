"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Modal,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaImage, FaEdit } from "react-icons/fa";
import { uploadImage } from "@/utils/uploadImage";
import { updateTicket } from "@/lib/api/tickets/action";
import { useSession } from "@/lib/auth-client";

const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

const LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const PERKS = [
  "AC",
  "WiFi",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Charging Port",
  "Reclining Seat",
  "Blanket",
  "Water Bottle",
];

const EditTicketModal = ({ ticket, disabled = false }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (ticket && isOpen) {
      reset({
        ...ticket,
        perks: ticket.perks || [],
      });
    }
  }, [ticket, isOpen, reset]);

  const onSubmit = async (data) => {
    try {
      const updateData = { ...data };

      if (data.image?.length > 0) {
        const imageUrl = await uploadImage(data.image[0]);
        updateData.image = imageUrl;
      } else {
        delete updateData.image;
      }

      delete updateData._id;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      const result = await updateTicket(updateData, ticket._id);

      if (result?.modifiedCount > 0 || result?.success) {
        toast.success("Ticket updated");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result?.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        radius="full"
        isDisabled={disabled}
        className="h-8 w-8 min-w-0 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
        onPress={() => setIsOpen(true)}
      >
        <FaEdit size={12} />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading className="text-2xl font-bold text-white">
                  Edit Ticket
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid w-full gap-5 md:grid-cols-2">
                    <Input
                      label="Ticket Title"
                      labelPlacement="outside"
                      {...register("title", { required: true })}
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      label="Replace Image"
                      labelPlacement="outside"
                      startContent={<FaImage />}
                      {...register("image")}
                    />
                  </div>

                  <div className="grid w-full gap-5 md:grid-cols-3">
                    <select
                      className="rounded-xl border border-border bg-background p-3 text-foreground"
                      {...register("transportType")}
                    >
                      {TRANSPORT_TYPES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      className="rounded-xl border border-border bg-background p-3 text-foreground"
                      {...register("from")}
                    >
                      {LOCATIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      className="rounded-xl border border-border bg-background p-3 text-foreground"
                      {...register("to")}
                    >
                      {LOCATIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid w-full gap-5 md:grid-cols-4">
                    <Input
                      type="date"
                      label="Departure Date"
                      labelPlacement="outside"
                      {...register("departureDate", { required: true })}
                    />
                    <Input
                      type="time"
                      label="Departure Time"
                      labelPlacement="outside"
                      {...register("departureTime", { required: true })}
                    />
                    <Input
                      type="number"
                      label="Price"
                      labelPlacement="outside"
                      {...register("price", { valueAsNumber: true })}
                    />
                    <Input
                      type="number"
                      label="Total Seats"
                      labelPlacement="outside"
                      {...register("quantity", { valueAsNumber: true })}
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {PERKS.map((perk) => (
                      <label
                        key={perk}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <input
                          type="checkbox"
                          value={perk}
                          defaultChecked={ticket?.perks?.includes(perk)}
                          {...register("perks")}
                        />
                        {perk}
                      </label>
                    ))}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Vendor Name"
                      value={session?.user?.name || ""}
                      isReadOnly
                    />
                    <Input
                      label="Vendor Email"
                      value={session?.user?.email || ""}
                      isReadOnly
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="bordered" onPress={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      isLoading={isSubmitting}
                    >
                      Update Ticket
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default EditTicketModal;
