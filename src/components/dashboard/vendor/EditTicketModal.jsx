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

import { FaImage, FaEdit } from "react-icons/fa";

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
  ticket
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
    if (ticket) {
      reset({
        ...ticket,
      });
    }
  }, [ticket, reset]);

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
        ticket._id
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
    >
      <Button isIconOnly size="sm" radius="full" className="h-8 w-8 min-w-0 p-0 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:scale-[1.03] transition-all duration-200"><FaEdit size={12} /></Button>
      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
      <Modal.Container>
          <Modal.Dialog>
          <Modal.Header>
            <Modal.Icon className="text-indigo-500" /> 
            <Modal.Heading className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Edit Ticket
            </Modal.Heading>
            </Modal.Header>
          <Modal.Body>
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
                  color="secondary"
                  slot="close"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  slot="close"
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
  );
};
export default EditTicketModal;