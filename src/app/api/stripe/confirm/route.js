import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import { baseURL } from "@/lib/api/baseUrl";

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment was not completed" },
        { status: 400 }
      );
    }

    const bookingId = session.metadata?.bookingId;
    const userEmail = session.metadata?.userEmail;

    if (!bookingId || !userEmail) {
      return NextResponse.json(
        { error: "Invalid payment session metadata" },
        { status: 400 }
      );
    }

    const transactionId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || session.id;

    const res = await fetch(`${baseURL}/api/payments/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
