"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../server";

export const createUser = async (userData) => {
  const resData = await serverMutation(userData, "/api/users", "POST");
  return resData;
};

export const updateUserRole = async (id, role) => {
  const resData = await serverMutation({ role }, `/api/users/${id}`, "PATCH");
  revalidatePath("/dashboard/admin/users");
  return resData;
};

export const updateUserFraud = async (id, isFraud) => {
  const resData = await serverMutation({ isFraud }, `/api/users/${id}`, "PATCH");
  revalidatePath("/dashboard/admin/users");
  return resData;
};