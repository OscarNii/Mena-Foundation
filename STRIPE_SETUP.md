// supabase/functions/create-payment-intent/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { Stripe } from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  try {
    const { amount, currency, metadata } = await req.json()
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})# Mena Foundation - Stripe Payment Integration

## Overview
This document explains how to set up Stripe payments for the Mena Foundation donation system.

## Files Created/Modified

### Frontend
- `src/lib/stripe.ts` - Stripe initialization
- `src/lib/payment.ts` - Payment API helpers
- `src/components/DonationForm.tsx` - Updated with Stripe Elements

### Backend (Supabase Edge Functions)
- `supabase/functions/create-payment-intent/index.ts` - Creates payment intents
- `supabase/config.toml` - Supabase configuration

### Database
- `supabase/migrations/20260108000000_add_stripe_payment_columns.sql` - Payment tracking columns

---

## Setup Instructions

### Step 1: Add Stripe Secret to Supabase

1. Go to your **Supabase Dashboard**
2. Navigate to **Edge Functions** → **Secrets**
3. Add a new secret:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_test_51T19egLwFtywK2up3PPyr9ldw7kaJ5gjQJOx7XA5oQV3BqyAZ93OPqSei6oObW25CIPFiRFZnElJSxBfjJiM3X3M00JGc6itCm`

### Step 2: Run Database Migration

Run this SQL in your Supabase SQL Editor to add payment tracking columns:

```sql
-- Add payment tracking columns to donations table
ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS stripe_payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'requires_action')),
ADD COLUMN IF NOT EXISTS payment_intent_client_secret TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_donations_payment_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_payment_id ON donations(stripe_payment_id);
```

### Step 3: Deploy the Edge Function

**Option A: Using Supabase CLI (if you have access)**

```bash
supabase functions deploy create-payment-intent
```

**Option B: Manual deployment via Dashboard**

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Click **New Function**
3. Name it `create-payment-intent`
4. Paste the code from `supabase/functions/create-payment-intent/index.ts`
5. Click **Deploy**

### Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the donation page
3. Select an amount and fill in your details
4. Click "Continue to Payment"
5. Use Stripe test card: `4242 4242 4242 4242` with any future date and any CVC

---

## Stripe Test Cards

Use these test cards to simulate different scenarios:

| Card Number | Scenario |
|------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Declined |
| 4000 0000000003220 | Requires authentication |

**Test Expiry:** Any future date (e.g., 12/30)
**Test CVC:** Any 3 digits (e.g., 123)

---

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://zbxkshilsraxnkbakhsj.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51T19egLwFtywK2upBfprOLMejz2CeGzWX5avdOIW23EZv4cZJHg9DdVTdxM59CbJaoSSHRwFxQpUzRiS0na7gAie00qhE04qN7
```

### Backend (Supabase Secrets)
```
STRIPE_SECRET_KEY=sk_test_51T19egLwFtywK2up3PPyr9ldw7kaJ5gjQJOx7XA5oQV3BqyAZ93OPqSei6oObW25CIPFiRFZnElJSxBfjJiM3X3M00JGc6itCm
```

---

## Going Live

When ready to go live:

1. **Switch to Stripe Live Keys:**
   - Replace `pk_test_...` with `pk_live_...` in `.env`
   - Replace `sk_test_...` with `sk_live_...` in Supabase Secrets

2. **Enable Stripe in Dashboard:**
   - Go to Supabase → Edge Functions → Secrets
   - Make sure `STRIPE_SECRET_KEY` is set to the **live** secret key

3. **Test with Live Cards:**
   - Use a real card for a small amount to verify

