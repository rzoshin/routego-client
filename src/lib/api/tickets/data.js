import { serverFetch } from '../server';

export const myTickets = async (email) => {
  //   console.log(email, 'email');

  const result = await serverFetch(`/api/tickets/${email}`);
  //   console.log(result, 'my events');

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