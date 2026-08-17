'use client'

import { useState } from 'react'

export function CheckoutButton({ productName, price, disabled }: { productName: string; price?: number; disabled: boolean }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function generateInvoice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (typeof price !== 'number' || price <= 0) {
      setError('This product does not have a valid price yet.')
      return
    }

    const invoiceNumber = `SGL-${Date.now().toString(36).toUpperCase()}`
    const invoice = [
      'SCHOOLGRADE LINK',
      'PURCHASE INVOICE',
      '',
      `Invoice: ${invoiceNumber}`,
      `Date: ${new Date().toLocaleDateString()}`,
      `Buyer email: ${email}`,
      '',
      `Product: ${productName}`,
      `Amount due: NGN ${price.toLocaleString()}`,
      '',
      'Payment instructions will be provided by the SchoolGrade Link team.',
      'Contact: schoolgrade4all@gmail.com | +234 807 641 9643',
    ].join('\n')
    const blob = new Blob([invoice], { type: 'text/plain;charset=utf-8' })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `${invoiceNumber}.txt`
    link.click()
    URL.revokeObjectURL(downloadUrl)
  }

  return (
    <form onSubmit={generateInvoice} className="mt-6 space-y-3">
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
        disabled={disabled}
        className="w-full rounded-md bg-sglinkBlue px-4 py-2 text-sm font-semibold text-white transition hover:bg-sglinkDark disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {disabled ? 'Unavailable' : 'Generate purchase invoice'}
      </button>
      {error && <p className="text-sm text-red-700">{error}</p>}
    </form>
  )
}