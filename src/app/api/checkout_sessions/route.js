import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { baseURL } from "@/lib/api/baseUrl";
import { isDeparturePassed } from "@/lib/parseDepartureDateTime";
import { auth } from "@/lib/auth";
import { getAuthHeaders } from "@/lib/api/authHeaders";

async function fetchBooking(bookingId, authHeaders) {
  const res = await fetch(`${baseURL}/api/bookings/id/${bookingId}`, {
    cache: "no-store",
    headers: authHeaders,
  });
  if (!res.ok) return null;
  return res.json();
}

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const bookingId = String(body?.bookingId || "");
    const userEmail = String(body?.userEmail || "");

    if (!bookingId || !userEmail) {
      return NextResponse.json(
        { error: "Booking ID and user email are required" },
        { status: 400 }
      );
    }

    if (userEmail !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const authHeaders = await getAuthHeaders();
    const booking = await fetchBooking(bookingId, authHeaders);

    if (!booking?._id) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.userEmail !== userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (booking.bookingStatus === "paid") {
      return NextResponse.json(
        { error: "Booking is already paid" },
        { status: 400 }
      );
    }

    if (booking.bookingStatus !== "accepted") {
      return NextResponse.json(
        { error: "Only accepted bookings can be paid" },
        { status: 400 }
      );
    }

    if (isDeparturePassed(booking.departureDate, booking.departureTime)) {
      return NextResponse.json(
        { error: "Payment unavailable — departure time has passed" },
        { status: 400 }
      );
    }

    const quantity = Number(booking.quantity) || 1;
    const totalPrice = Number(booking.totalPrice) || 0;
    const unitPrice = totalPrice / quantity;

    if (totalPrice <= 0) {
      return NextResponse.json({ error: "Invalid booking amount" }, { status: 400 });
    }

    const origin =
      requestHeaders.get("origin") ||
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
      "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: booking.ticketTitle || "RouteGo ticket",
              description: `${booking.from || ""} → ${booking.to || ""}`.trim(),
            },
            unit_amount: Math.round(unitPrice * 100),
          },
          quantity,
        },
      ],
      metadata: {
        bookingId,
        userEmail,
      },
      success_url: `${origin}/dashboard/user/tickets?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/user/tickets`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: err.statusCode || 500 }
    );
  }
}
