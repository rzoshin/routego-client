import { serverFetch } from "../server";

export const getVendorStats = async (email) => {
  const result = await serverFetch(
    `/api/vendor/stats/${encodeURIComponent(email)}`
  );
  return result;
};
