import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAuthHeaders() {
  const requestHeaders = await headers();
  const { token } = await auth.api.getToken({ headers: requestHeaders });

  if (!token) {
    throw new Error("Unauthorized");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
