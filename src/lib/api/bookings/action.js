"use server";

import { serverMutation } from "../server";

export const addBooking = async (bookingData) => {
  const resData = await serverMutation(
    bookingData,
    "/api/bookings",
    "POST"
  );

  return resData;
};