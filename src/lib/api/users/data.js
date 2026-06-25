import { serverFetch } from "../server";

export const getUserProfile = async (email) => {
  const result = await serverFetch(`/api/users/${encodeURIComponent(email)}`);
  return result;
};

export const getUserStats = async (email) => {
  const result = await serverFetch(
    `/api/users/${encodeURIComponent(email)}/stats`
  );
  return result;
};
