import { serverFetch } from "../server";

export const myTickets = async (email) => {
  const result = await serverFetch(`/api/tickets/vendor/${email}`);
  return result;
};

export const fetchTickets = async (query) => {
  const result = await serverFetch(`/api/tickets?${query.toString()}`);
  return result;
};

export const fetchFeaturedTickets = async () => {
  const result = await serverFetch(`/api/tickets/featured`);
  return result;
};

export const fetchLatestTickets = async () => {
  const result = await serverFetch(`/api/tickets/latest`);
  return result;
};
