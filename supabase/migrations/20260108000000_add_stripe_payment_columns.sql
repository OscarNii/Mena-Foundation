-- Add payment tracking columns to donations table
ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS stripe_payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'requires_action')),
ADD COLUMN IF NOT EXISTS payment_intent_client_secret TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_donations_payment_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_stripe_payment_id ON donations(stripe_payment_id);

