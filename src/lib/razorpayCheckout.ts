interface RazorpaySuccessResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
  handler: (response: RazorpaySuccessResponse) => void
  modal?: { ondismiss?: () => void }
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void }
  }
}

const CHECKOUT_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

let scriptLoadPromise: Promise<void> | null = null

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve()
  if (scriptLoadPromise) return scriptLoadPromise

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = CHECKOUT_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script'))
    document.body.appendChild(script)
  })
  return scriptLoadPromise
}

export async function openRazorpayCheckout(params: {
  keyId: string
  orderId: string
  amount: number
  currency: string
  campaignTitle: string
  prefill?: { name?: string; email?: string; contact?: string }
}): Promise<RazorpaySuccessResponse> {
  await loadRazorpayScript()

  return new Promise((resolve, reject) => {
    const razorpay = new window.Razorpay({
      key: params.keyId,
      amount: params.amount,
      currency: params.currency,
      order_id: params.orderId,
      name: 'HKM Visakhapatnam',
      description: `Donation: ${params.campaignTitle}`,
      prefill: params.prefill,
      theme: { color: '#e2620a' },
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error('Payment window closed before completion')),
      },
    })
    razorpay.open()
  })
}
