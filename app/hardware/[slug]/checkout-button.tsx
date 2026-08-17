'use client'

import { useState } from 'react'

export function CheckoutButton({ productId, disabled }: { productId: string; disabled: boolean }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function beginCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/checkout/paystack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, email }),
      })
      const result = await response.json()

      if (!response.ok || !result.authorizationUrl) {
        throw new Error(result.error || 'Unable to begin checkout.')
      }

      window.location.assign(result.authorizationUrl)
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to begin checkout.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={beginCheckout} className="mt-6 space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Email for your receipt
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-sglinkBlue focus:ring-2 focus:ring-sglinkBlue/20"
        />
      </label>
      <button
        type="submit"
        disabled={disabled || isSubmitting}
        className="w-full rounded-md bg-sglinkBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-sglinkDark disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {disabled ? 'Unavailable' : isSubmitting ? 'Opening secure checkout...' : 'Checkout securely'}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  )
}