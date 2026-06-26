"use client";

import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Input,
  Form,
  Label,
} from "@heroui/react";
import { FaImage } from "react-icons/fa";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import FraudBanner from "@/components/dashboard/vendor/FraudBanner";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { addTicket } from "@/lib/api/tickets/action";
import { useSession } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

const TO_LOCATIONS = [...FROM_LOCATIONS];

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

export default function AddTicketForm({ isFraud = false }) {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    if (isFraud) {
      toast.error("Fraud-flagged vendors cannot add tickets");
      return;
    }

    try {
      const imageFile = data.image[0];
      const imageUrl = await uploadImage(imageFile);

      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: data.price,
        quantity: data.quantity,
        departureDate: data.departureDate,
        departureTime: data.departureTime,
        perks: data.perks || [],
        image: imageUrl,
        vendorId: session.user.id,
        vendorName: session.user.name,
        vendorEmail: session.user.email,
        verificationStatus: "pending",
        isAdvertised: false,
        bookedSeats: 0,
      };

      const result = await addTicket(ticketData);

      if (result.insertedId) {
        toast.success("Ticket submitted for verification");
        router.push("/dashboard/vendor/added-tickets");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to create ticket");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Add New Ticket"
        description="Submit ticket details for admin verification."
      />

      {isFraud ? <div className="mt-6"><FraudBanner /></div> : null}

      <div className="mt-6 max-w-3xl">
        <Card
          className="rounded-2xl border border-white/5 bg-slate-900/40 shadow-2xl backdrop-blur-xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 border-b border-white/5 p-6 pb-4">
            <h3 className="text-xl font-bold text-white">Ticket Details</h3>
            <p className="text-xs text-slate-400">
              All fields are required unless marked optional.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="w-full">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    className="w-full border-white/10 bg-slate-900/50 p-3 hover:border-pink-500/50 focus-within:!border-pink-500"
                    labelPlacement="outside"
                    placeholder="e.g. Dhaka to Cox's Bazar Express"
                    isDisabled={isFraud}
                    {...register("title", {
                      required: "Ticket title is required",
                    })}
                  />
                  {errors.title ? (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.title.message}
                    </p>
                  ) : null}
                </div>

                <div className="w-full">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    isDisabled={isFraud}
                    startContent={<FaImage className="text-sm text-slate-400" />}
                    className="w-full border-white/10 bg-slate-900/50 hover:border-pink-500/50 focus-within:!border-pink-500"
                    {...register("image", { required: "Image is required" })}
                  />
                  {errors.image ? (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.image.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                <div className="w-full">
                  <Label htmlFor="transportType">Transport Type</Label>
                  <select
                    id="transportType"
                    disabled={isFraud}
                    {...register("transportType", {
                      required: "Transport type is required",
                    })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white"
                  >
                    {TRANSPORT_TYPES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <Label htmlFor="from">From</Label>
                  <select
                    id="from"
                    disabled={isFraud}
                    {...register("from", { required: "From is required" })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white"
                  >
                    {FROM_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <Label htmlFor="to">To</Label>
                  <select
                    id="to"
                    disabled={isFraud}
                    {...register("to", { required: "To is required" })}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-white"
                  >
                    {TO_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Input
                    type="date"
                    isDisabled={isFraud}
                    className="w-full border-white/10 bg-slate-900/50 p-3"
                    {...register("departureDate", {
                      required: "Departure date is required",
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="departureTime">Departure Time</Label>
                  <Input
                    type="time"
                    isDisabled={isFraud}
                    className="w-full border-white/10 bg-slate-900/50 p-3"
                    {...register("departureTime", {
                      required: "Departure time is required",
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    isDisabled={isFraud}
                    placeholder="0"
                    className="w-full border-white/10 bg-slate-900/50 p-3"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price cannot be negative" },
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    isDisabled={isFraud}
                    placeholder="100"
                    className="w-full border-white/10 bg-slate-900/50 p-3"
                    {...register("quantity", {
                      required: "Quantity is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Quantity must be at least 1" },
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {PERKS.map((perk) => (
                  <label key={perk} className="flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      value={perk}
                      disabled={isFraud}
                      {...register("perks")}
                    />
                    <span>{perk}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                isDisabled={isFraud}
                isLoading={isSubmitting}
                className="h-11 bg-gradient-to-r from-pink-500 to-indigo-600 px-6 font-bold text-white shadow-lg shadow-pink-500/10"
                radius="lg"
              >
                Add Ticket
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}
