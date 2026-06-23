import { serverFetch } from '../server';

export const myTickets = async (email) => {
  //   console.log(email, 'email');

  const result = await serverFetch(`/api/tickets/${email}`);
  //   console.log(result, 'my events');

  return result;
};