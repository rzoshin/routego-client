import "server-only";

import { authenticatedFetch } from "../authenticatedServer";

function normalizeTicketList(result) {
  if (!Array.isArray(result)) return [];
  return result.map((ticket) => ({
    ...ticket,
    _id: String(ticket._id),
    isAdvertised: Boolean(ticket.isAdvertised),
  }));
}

export const myTickets = async (email) => {
  const result = await authenticatedFetch(`/api/tickets/vendor/${email}`);
  return normalizeTicketList(result);
};

export const fetchAdminTickets = async () => {
  const result = await authenticatedFetch(`/api/tickets/admin/all`);
  return result;
};

export const fetchApprovedTickets = async () => {
  const result = await authenticatedFetch(`/api/tickets/admin/approved`);
  return result;
};
