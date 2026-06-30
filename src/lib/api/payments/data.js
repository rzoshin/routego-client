import "server-only";

import { authenticatedFetch } from "../authenticatedServer";

export const fetchUserTransactions = async (email) => {
  const result = await authenticatedFetch(
    `/api/payments/user/${encodeURIComponent(email)}`
  );
  return result;
};
