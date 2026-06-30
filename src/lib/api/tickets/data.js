import { serverFetch } from "../server";

function normalizeTicketList(result) {
  if (!Array.isArray(result)) return [];
  return result.map((ticket) => ({
    ...ticket,
    _id: String(ticket._id),
    isAdvertised: Boolean(ticket.isAdvertised),
  }));
}

export const myTickets = async (email) => {
  const result = await serverFetch(`/api/tickets/vendor/${email}`);
  return normalizeTicketList(result);
};

export const fetchTickets = async (query) => {
  const result = await serverFetch(`/api/tickets?${query.toString()}`);
  return result;
};

export const fetchFeaturedTickets = async () => {
  const result = await serverFetch(`/api/tickets/featured`);
  return normalizeTicketList(result);
};

export const fetchLatestTickets = async () => {
  const result = await serverFetch(`/api/tickets/latest`);
  return normalizeTicketList(result);
};

export const fetchAdminTickets = async () => {
  const result = await serverFetch(`/api/tickets/admin/all`);
  return result;
};

export const fetchApprovedTickets = async () => {
  const result = await serverFetch(`/api/tickets/admin/approved`);
  return result;
};
