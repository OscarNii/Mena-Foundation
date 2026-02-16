import { supabase } from './supabase';

export interface CreatePaymentIntentParams {
  amount: number;
  donor_name: string;
  donor_email: string;
  message: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  donationId: string;
}

export async function createPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<PaymentIntentResponse> {
  const { data, error } = await supabase.functions.invoke(
    'create-payment-intent',
    {
      body: params,
    }
  );

  if (error) {
    throw new Error(error.message || 'Failed to create payment intent');
  }

  return data;
}

export async function updateDonationPaymentStatus(
  donationId: string,
  status: 'succeeded' | 'failed' | 'requires_action'
): Promise<void> {
  const updates: Record<string, unknown> = {
    payment_status: status,
  };

  if (status === 'succeeded') {
    updates.paid_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('donations')
    .update(updates)
    .eq('id', donationId);

  if (error) {
    console.error('Failed to update donation status:', error);
    throw new Error('Failed to update payment status');
  }
}

