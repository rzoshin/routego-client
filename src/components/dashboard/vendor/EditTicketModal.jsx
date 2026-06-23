import React from "react";
import {
  Button,
  Input,
  Form,
  Label,
  Modal,
} from "@heroui/react";
import { FaImage } from "react-icons/fa";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { useForm } from "react-hook-form";
import { addTicket, updateTicket } from "@/lib/api/tickets/action";
import { useSession } from "@/lib/auth-client";

const FROM_LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const TO_LOCATIONS = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];

const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

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

const EditTicketModal = ({ isModalOpen, setIsModalOpen, editingTicket }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      const imageUrl = await uploadImage(imageFile);

      const updateData = {
            ...data
        }
        
        if (data?.banner) {
            const imageFile = data.banner[0];
            const imageUrl = await uploadImage(imageFile)
            updateData.banner = imageUrl;
        }
      const result = await updateTicket(updateData, editingTicket?._id);

      if (result.insertedId) {
        toast.success("Ticket submitted for verification");

        router.push("/dashboard/vendor/added-tickets");
        router.refresh();
      } else {
        toast.error("Failed to create ticket");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <DashboardHeading title="Add New Ticket" description="" />
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-lg mx-auto">
              <div className="p-6">
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  {/* Title + Image */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        label="Ticket Title"
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                        labelPlacement="outside"
                        placeholder="e.g. Rock Fest 2026"
                        {...register("title", {
                          required: "Ticket title is required",
                        })}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <Label htmlFor="image">Image</Label>
                      <Input
                        {...register("image", {
                          required: "Image is Required",
                        })}
                        type="file"
                        accept="image/*"
                        id="logo"
                        placeholder="https://example.com/avatar.jpg"
                        labelPlacement="outside"
                        startContent={
                          <FaImage className="text-slate-400 text-sm" />
                        }
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                      />
                      {errors.banner && (
                        <p className="text-red-500">{errors.banner.message}</p>
                      )}
                      {errors.banner && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.banner.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category + Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <Label htmlFor="transportType">Transport Type</Label>
                      <select
                        id="transportType"
                        {...register("transportType", {
                          required: "Transport type is required",
                        })}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      >
                        {TRANSPORT_TYPES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>

                      <input
                        type="hidden"
                        {...register("transportType", {
                          required: "Transport type is required",
                        })}
                      />

                      {errors.transportType && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.transportType.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <Label htmlFor="from">From</Label>
                      <select
                        id="from"
                        {...register("from", { required: "From is required" })}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      >
                        {FROM_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>

                      <input
                        type="hidden"
                        {...register("from", {
                          required: "From is required",
                        })}
                      />

                      {errors.from && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.from.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <Label htmlFor="to">To</Label>
                      <select
                        id="to"
                        {...register("to", { required: "To is required" })}
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      >
                        {TO_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>

                      <input
                        type="hidden"
                        {...register("to", {
                          required: "To is required",
                        })}
                      />

                      {errors.to && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.to.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date + Price + Capacity */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                        type="date"
                        label="Date"
                        labelPlacement="outside"
                        {...register("date", {
                          required: "Date is required",
                        })}
                      />

                      {errors.date && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                        type="number"
                        label="Ticket Price ($)"
                        labelPlacement="outside"
                        placeholder="0.00"
                        {...register("price", {
                          required: "Price is required",
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: "Price cannot be negative",
                          },
                        })}
                      />

                      {errors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        type="number"
                        label="Available Quantity"
                        labelPlacement="outside"
                        placeholder="100"
                        {...register("quantity", {
                          required: "Quantity is required",
                          valueAsNumber: true,
                          min: {
                            value: 1,
                            message: "Quantity must be at least 1",
                          },
                        })}
                      />

                      {errors.quantity && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.quantity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {PERKS.map((perk) => (
                      <label key={perk} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={perk}
                          {...register("perks")}
                        />

                        <span>{perk}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Vendor Name"
                      labelPlacement="outside"
                      value={session?.user?.name || ""}
                      isReadOnly
                    />

                    <Input
                      label="Vendor Email"
                      labelPlacement="outside"
                      value={session?.user?.email || ""}
                      isReadOnly
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                    radius="lg"
                  >
                    Update Ticket
                  </Button>
                </Form>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditTicketModal;
