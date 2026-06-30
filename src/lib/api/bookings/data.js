import { authenticatedFetch } from "../server";

export const fetchMyBooking = async (email) => {
  const result = await authenticatedFetch(`/api/bookings/${encodeURIComponent(email)}`);
  return result;
};

export const fetchVendorBooking = async (email) => {
  const result = await authenticatedFetch(
    `/api/bookings/vendor/${encodeURIComponent(email)}`
  );
  return result;
};

export const fetchBookingById = async (id) => {
  const result = await authenticatedFetch(`/api/bookings/id/${id}`);
  return result;
};
