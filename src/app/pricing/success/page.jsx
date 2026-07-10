
import { createSubscription } from '@/lib/actions/subscriptions'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, ArrowRight, Package } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status ,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }
 
  if (status === 'complete') {
    const subsInfo = {
        email : customerEmail,
        planId : metadata?.planId
    }

    const result = await createSubscription(subsInfo);
    console.log(result)
    return (
      <section id="success">
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We have received your payment and your order is being processed.
        </p>

        {/* Order Details Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left border border-gray-100">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-sm text-gray-500">Order Number</span>
            <span className="text-sm font-semibold text-gray-900">#ORD-77291</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-500">Thanks for connecting with us</span>
            <span className="text-sm font-semibold text-gray-900">Enjoy your Pakage</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/dashboard/seller/Purchased"
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <Package className="mr-2 h-5 w-5" />
            View My Orders
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center w-full text-gray-600 hover:text-gray-900 font-medium py-2"
          >
            Return to Homepage
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
      </section>
    )
  }
}