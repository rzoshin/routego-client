import { serverFetch } from "../server";

export const getUserProfile = async (email) => {
  const result = await serverFetch(`/api/users/${email}`);
  return result;
};

export const getUserStats = async (email) => {
  const result = await serverFetch(
    `/api/users/${email}/stats`
  );
  return result;
};

export const getAllUsers = async () => {
  const result = await serverFetch(`/api/users`);
  return result;
};
