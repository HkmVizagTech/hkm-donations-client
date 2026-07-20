import { API_URL } from '../lib/apiClient'

export function DonationSuccess({ receiptUrl, onClose }: { receiptUrl: string; onClose: () => void }) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-3xl">🙏</div>
      <h3 className="mt-5 font-serif text-2xl font-semibold text-ink-900">Thank You for Your Donation</h3>
      <p className="mt-2 text-sm text-ink-600">
        Your contribution supports the mission of Hare Krishna Movement Visakhapatnam. A receipt has
        been generated for your records.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href={`${API_URL}${receiptUrl}`}
          target="_blank"
          rel="noreferrer"
          className="cta-gradient rounded-full px-6 py-3 text-sm font-semibold shadow-md"
        >
          Download Receipt
        </a>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-sky-200 px-6 py-3 text-sm font-semibold text-ink-700 hover:bg-sky-50"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export function DonationFailure({
  reason,
  onRetry,
}: {
  reason: string
  onRetry: () => void
}) {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-100 text-3xl">🙁</div>
      <h3 className="mt-5 font-serif text-2xl font-semibold text-ink-900">Payment Not Completed</h3>
      <p className="mt-2 text-sm text-ink-600">
        {reason || 'Something went wrong while processing your donation.'} No amount has been charged
        if the payment window was closed before completion.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="cta-gradient mt-6 rounded-full px-6 py-3 text-sm font-semibold shadow-md"
      >
        Try Again
      </button>
    </div>
  )
}
