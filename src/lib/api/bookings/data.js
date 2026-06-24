import { serverFetch } from '../server';

export const fetchMyBooking = async (email) => {
  const result = await serverFetch(`/api/bookings/${email}`);

  return result;
};
