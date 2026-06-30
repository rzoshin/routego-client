"use server";

import { revalidatePath } from "next/cache";
import { authenticatedMutation } from "../authenticatedServer";

export const addBooking = async (bookingData) => {
  const resData = await authenticatedMutation(bookingData, "/api/bookings", "POST");
  return resData;
};

export const updateBookingStatus = async (bookingId, status) => {
  const resData = await authenticatedMutation(
    { status },
    `/api/bookings/${bookingId}/status`,
    "PATCH"
  );
  revalidatePath("/dashboard/vendor/bookings");
  return resData;
};
