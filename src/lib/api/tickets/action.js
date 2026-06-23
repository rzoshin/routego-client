"use server";

import { deleteMutation, serverMutation } from "../server";

export const addTicket = async (ticketData) => {
    const resData = await serverMutation(ticketData, "/api/tickets", "POST");
    return resData;
}

export const updateTicket = async (data, id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await serverMutation(`/api/tickets/${id}`, 'PATCH', data);
  return resData;
};

export const deleteTicket = async (id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await deleteMutation(`/api/tickets/${id}`);
  revalidatePath('/dashboard/organizer/manage-events');
  return resData;
};