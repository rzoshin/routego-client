import { authenticatedFetch } from "../server";

export const getUserProfile = async (email) => {
  const result = await authenticatedFetch(`/api/users/${email}`);
  return result;
};

export const getUserStats = async (email) => {
  const result = await authenticatedFetch(
    `/api/users/${email}/stats`
  );
  return result;
};

export const getAllUsers = async () => {
  const result = await authenticatedFetch(`/api/users`);
  return result;
};
