"use server";

import { revalidatePath } from "next/cache";
import { deleteMutation, serverMutation } from "../server";

export const addTicket = async (ticketData) => {
  const resData = await serverMutation(ticketData, "/api/tickets", "POST");
  revalidatePath("/dashboard/vendor/added-tickets");
  return resData;
};

export const updateTicket = async (data, id) => {
  const resData = await serverMutation(data, `/api/tickets/${id}`, "PATCH");
  revalidatePath("/dashboard/vendor/added-tickets");
  return resData;
};

export const deleteTicket = async (id) => {
  const resData = await deleteMutation(`/api/tickets/${id}`);
  revalidatePath("/dashboard/vendor/added-tickets");
  return resData;
};
