import { serverFetch } from "../server";

export const fetchUserTransactions = async (email) => {
  const result = await serverFetch(
    `/api/payments/user/${encodeURIComponent(email)}`
  );
  return result;
};
