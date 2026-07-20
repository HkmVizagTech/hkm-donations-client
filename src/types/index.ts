export type ContentStatus = 'verified' | 'coming-soon'

export interface DonationTier {
  amount: number
  label: string
  description?: string
}

export interface ImpactStat {
  label: string
  value: string
}

export interface Testimonial {
  quote: string
  name: string
  role?: string
}

export interface Campaign {
  _id: string
  title: string
  slug: string
  category: string
  shortDescription?: string
  description?: string
  story?: string
  heroImage?: string
  gallery?: string[]
  donationTiers: DonationTier[]
  goalAmount: number
  raisedAmount: number
  impactStats?: ImpactStat[]
  testimonials?: Testimonial[]
  features?: string[]
  festival?: string | null
  isActive: boolean
  isFeatured: boolean
  contentStatus: ContentStatus
  createdAt: string
  updatedAt: string
}

export interface Festival {
  _id: string
  name: string
  slug: string
  description?: string
  startDate?: string
  endDate?: string
  campaign?: Campaign | null
  isActive: boolean
  contentStatus: ContentStatus
  createdAt: string
  updatedAt: string
}

export interface DonorInput {
  name: string
  email?: string
  phone?: string
  address?: string
  pan?: string
}

export interface DedicationInput {
  isMemorial?: boolean
  memorialName?: string
  sevaSelected?: string
  message?: string
}

export interface CreateOrderResponse {
  orderId: string
  amount: number
  currency: string
  keyId: string
  donationId: string
}

export interface VerifyPaymentResponse {
  donationId: string
  status: 'created' | 'paid' | 'failed'
  receiptUrl: string
}

export interface Donation {
  _id: string
  donor: { name: string; email?: string; phone?: string }
  campaign: { _id: string; title: string; slug: string }
  amount: number
  currency: string
  status: 'created' | 'paid' | 'failed'
  dedication?: DedicationInput
  razorpayOrderId?: string
  razorpayPaymentId?: string
  createdAt: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
}

export interface PublicStats {
  totalRaised: number
  totalDonors: number
  activeCampaigns: number
}

export interface RecentDonation {
  name: string
  amount: number
  campaignTitle?: string
  seva?: string | null
  at: string
}
