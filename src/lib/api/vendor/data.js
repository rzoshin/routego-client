import "server-only";

import { authenticatedFetch } from "../authenticatedServer";

export const getVendorStats = async (email) => {
  const result = await authenticatedFetch(
    `/api/vendor/stats/${encodeURIComponent(email)}`
  );
  return result;
};
