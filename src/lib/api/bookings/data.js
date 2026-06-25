import { serverFetch } from "../server";

export const fetchMyBooking = async (email) => {
  const result = await serverFetch(`/api/bookings/${encodeURIComponent(email)}`);
  return result;
};

export const fetchVendorBooking = async (email) => {
  const result = await serverFetch(
    `/api/bookings/vendor/${encodeURIComponent(email)}`
  );
  return result;
};

export const fetchBookingById = async (id) => {
  const result = await serverFetch(`/api/bookings/id/${id}`);
  return result;
};
