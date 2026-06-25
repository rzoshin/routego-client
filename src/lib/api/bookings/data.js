import { serverFetch } from '../server';

export const fetchMyBooking = async (email) => {
  const result = await serverFetch(`/api/bookings/${email}`);

  return result;
};

export const fetchVendorBooking = async (email) => {
  const result = await serverFetch(`/api/bookings/vendor/${email}`);

  return result;
};
//     app.get("/api/bookings/vendor/:email", async (req, res) => {
    //   try {
    //     const { email } = req.params;

    //     const result =
    //       await bookingsCollection
    //         .find({
    //           vendorEmail: email,
    //         })
    //         .toArray();

    //     res.send(result);
    //   } catch (error) {
    //     console.error(error);

    //     res.status(500).send({
    //       message: "Failed to fetch bookings",
    //     });
    //   }
    // });