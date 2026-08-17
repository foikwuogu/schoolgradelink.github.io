import Link from 'next/link'

export default function CheckoutCompletePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Payment processing</h1>
      <p className="mt-3 text-sm text-gray-700">
        Paystack is confirming your payment. Your receipt and payment status will be sent to the email address used at checkout.
      </p>
      <Link href="/hardware" className="mt-6 inline-block rounded-md bg-sglinkBlue px-4 py-2 text-sm font-semibold text-white">
        Return to marketplace
      </Link>
    </div>
  )
}