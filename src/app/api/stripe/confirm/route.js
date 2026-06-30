import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { baseURL } from "@/lib/api/baseUrl";
import { auth } from "@/lib/auth";
import { getAuthHeaders } from "@/lib/api/authHeaders";

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

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment was not completed" },
        { status: 400 }
      );
    }

    const bookingId = checkoutSession.metadata?.bookingId;
    const userEmail = checkoutSession.metadata?.userEmail;

    if (!bookingId || !userEmail) {
      return NextResponse.json(
        { error: "Invalid payment session metadata" },
        { status: 400 }
      );
    }

    if (userEmail !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const transactionId =
      typeof checkoutSession.payment_intent === "string"
        ? checkoutSession.payment_intent
        : checkoutSession.payment_intent?.id || checkoutSession.id;

    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${baseURL}/api/payments/complete`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        bookingId,
        userEmail,
        transactionId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || "Failed to complete payment" },
        { status: res.status }
      );
    }

    revalidatePath("/dashboard/user/tickets");
    revalidatePath("/dashboard/user/transactions");

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Payment confirmation failed" },
      { status: 500 }
    );
  }
}
