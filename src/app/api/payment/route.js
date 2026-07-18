import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getUserSession } from '@/lib/core/session';
import Stripe from 'stripe'; // Import the Stripe SDK

// Initialize Stripe with your private secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await request.formData()
    const price = formData.get("price")
    const title = formData.get("title")
    const productId = formData.get("productId")
    const user = await getUserSession();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            // Use Math.round to avoid potential floating-point precision bugs when multiplying currency numbers
            unit_amount: Math.round(Number(price) * 100), 
            product_data : {
                name: title || 'Premium Recipe'
            }
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/pricing/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/recipes/${productId}`, // Standard practice to give users a way out if they back out
      metadata: { 
          price: Number(price),
          userId : user?.id || formData.get("user_id"), // Fallback to form field if session isn't loaded yet
          userEmail : user?.email,
          title,
          productId
       },
    });

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}