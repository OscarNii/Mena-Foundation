import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const { amount, donor_name, donor_email, message } = await req.json();

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Convert amount to cents (Stripe uses cents)
    const amountInCents = Math.round(amount * 100);

    // Create Stripe PaymentIntent
    const stripeUrl = "https://api.stripe.com/v1/payment_intents";
    const stripeFormData = new URLSearchParams();
    stripeFormData.append("amount", amountInCents.toString());
    stripeFormData.append("currency", "usd");
    stripeFormData.append("metadata[donor_name]", donor_name || "");
    stripeFormData.append("metadata[donor_email]", donor_email || "");
    stripeFormData.append("metadata[message]", message || "");

    const stripeResponse = await fetch(stripeUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stripeFormData.toString(),
    });

    const paymentIntent = await stripeResponse.json();

    if (paymentIntent.error) {
      return new Response(
        JSON.stringify({ error: paymentIntent.error.message }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a pending donation record in the database
    const { data: donation, error: donationError } = await supabase
      .from("donations")
      .insert({
        donor_name: donor_name || "Anonymous",
        donor_email: donor_email || "",
        amount: amount,
        message: message || "",
        stripe_payment_id: paymentIntent.id,
        payment_status: "pending",
        payment_intent_client_secret: paymentIntent.client_secret,
      })
      .select()
      .single();

    if (donationError) {
      console.error("Database error:", donationError);
      // Continue anyway - the payment intent was created
    }

    // Return the client secret to the frontend
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        donationId: donation?.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

