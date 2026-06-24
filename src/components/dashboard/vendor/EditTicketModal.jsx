"use client";

import React, { useEffect } from "react";
import {
  Button,
  Input,
  Form,
  Modal,
} from "@heroui/react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FaImage } from "react-icons/fa";

import { uploadImage } from "@/utils/uploadImage";
import { updateTicket } from "@/lib/api/tickets/action";
import { useSession } from "@/lib/auth-client";

const TRANSPORT_TYPES = [
  "Bus",
  "Train",
  "Flight",
  "Launch",
];

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

const EditTicketModal = ({
  isModalOpen,
  setIsModalOpen,
  editingTicket,
}) => {
  const router = useRouter();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (editingTicket) {
      reset({
        ...editingTicket,
      });
    }
  }, [editingTicket, reset]);

  const onSubmit = async (data) => {
    try {
      const updateData = {
        ...data,
      };

      if (data.image?.length > 0) {
        const imageUrl = await uploadImage(
          data.image[0]
        );

        updateData.image = imageUrl;
      }

      const result = await updateTicket(
        updateData,
        editingTicket._id
      );

      if (
        result?.modifiedCount > 0 ||
        result?.success
      ) {
        toast.success("Ticket updated");

        setIsModalOpen(false);

        router.refresh();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      size="4xl"
      scrollBehavior="inside"
    >
      <Modal.Backdrop />

      <Modal.Container>
        <Modal.Dialog className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl">

          <div className="p-8">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Edit Ticket
            </h2>

            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-5 w-full">

                <Input
                  label="Ticket Title"
                  labelPlacement="outside"
                  {...register("title", {
                    required: true,
                  })}
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

              <div className="grid md:grid-cols-3 gap-5 w-full">

                <select
                  className="border rounded-xl p-3 bg-white dark:bg-slate-900"
                  {...register("transportType")}
                >
                  {TRANSPORT_TYPES.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded-xl p-3 bg-white dark:bg-slate-900"
                  {...register("from")}
                >
                  {LOCATIONS.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded-xl p-3 bg-white dark:bg-slate-900"
                  {...register("to")}
                >
                  {LOCATIONS.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              <div className="grid md:grid-cols-3 gap-5 w-full">

                <Input
                  type="date"
                  label="Departure Date"
                  labelPlacement="outside"
                  {...register("departureDate")}
                />

                <Input
                  type="number"
                  label="Price"
                  labelPlacement="outside"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />

                <Input
                  type="number"
                  label="Total Seats"
                  labelPlacement="outside"
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                />

              </div>

              <div className="grid md:grid-cols-3 gap-3">

                {PERKS.map((perk) => (
                  <label
                    key={perk}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={perk}
                      {...register("perks")}
                    />

                    {perk}
                  </label>
                ))}

              </div>

              <div className="grid md:grid-cols-2 gap-4">

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

                <Button
                  variant="bordered"
                  onPress={() =>
                    setIsModalOpen(false)
                  }
                >
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

          </div>

        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
};

export default EditTicketModal;