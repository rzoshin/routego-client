import { authenticatedFetch } from "../server";

export const getVendorStats = async (email) => {
  const result = await authenticatedFetch(
    `/api/vendor/stats/${encodeURIComponent(email)}`
  );
  return result;
};
