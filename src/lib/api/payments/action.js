"use server";

import { revalidatePath } from "next/cache";
import { authenticatedMutation } from "../authenticatedServer";

export const completePayment = async (bookingId, userEmail) => {
  const resData = await authenticatedMutation(
    { bookingId, userEmail },
    "/api/payments/complete",
    "POST"
  );
  revalidatePath("/dashboard/user/tickets");
  revalidatePath("/dashboard/user/transactions");
  return resData;
};
