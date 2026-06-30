"use server";

import { revalidatePath } from "next/cache";
import { syncUser } from "../users/action";
import { authenticatedDelete, authenticatedMutation } from "../server";

export const addTicket = async (ticketData) => {
  await syncUser();
  const resData = await authenticatedMutation(ticketData, "/api/tickets", "POST");
  revalidatePath("/dashboard/vendor/added-tickets");
  return resData;
};

export const updateTicket = async (data, id) => {
  const resData = await authenticatedMutation(data, `/api/tickets/${id}`, "PATCH");
  revalidatePath("/dashboard/vendor/added-tickets");
  return resData;
};

export const deleteTicket = async (id) => {
  const resData = await authenticatedDelete(`/api/tickets/${id}`);
  revalidatePath("/dashboard/vendor/added-tickets");
  return resData;
};

export const updateTicketVerification = async (id, status) => {
  const resData = await authenticatedMutation(
    { status },
    `/api/tickets/${id}/verification`,
    "PATCH"
  );
  revalidatePath("/dashboard/admin/tickets");
  revalidatePath("/dashboard/admin/advertise-tickets");
  return resData;
};

export const updateTicketAdvertise = async (id, isAdvertised) => {
  const resData = await authenticatedMutation(
    { isAdvertised },
    `/api/tickets/${id}/advertise`,
    "PATCH"
  );
  revalidatePath("/dashboard/admin/advertise-tickets");
  revalidatePath("/", "page");
  revalidatePath("/", "layout");
  return resData;
};
