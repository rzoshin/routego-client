"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/api/session";
import { authenticatedMutation } from "../authenticatedServer";

export const createUser = async (userData) => {
  const resData = await authenticatedMutation(userData, "/api/users", "POST");
  return resData;
};

export const syncUser = async () => {
  const user = await getUser();
  if (!user?.email) return null;

  return createUser({
    email: user.email,
    name: user.name,
    role: user.role,
    image: user.image ?? null,
  });
};

export const updateUserRole = async (id, role) => {
  const resData = await authenticatedMutation({ role }, `/api/users/${id}`, "PATCH");
  revalidatePath("/dashboard/admin/users");
  return resData;
};

export const updateUserFraud = async (id, isFraud) => {
  const resData = await authenticatedMutation({ isFraud }, `/api/users/${id}`, "PATCH");
  revalidatePath("/dashboard/admin/users");
  return resData;
};