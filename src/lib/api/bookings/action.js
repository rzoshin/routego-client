"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../server";

export const addBooking = async (bookingData) => {
  const resData = await serverMutation(bookingData, "/api/bookings", "POST");
  return resData;
};

export const updateBookingStatus = async (bookingId, status) => {
  const resData = await serverMutation(
    { status },
    `/api/bookings/${bookingId}/status`,
    "PATCH"
  );
  revalidatePath("/dashboard/vendor/bookings");
  return resData;
};
