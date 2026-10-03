import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    console.error("Variables d'environnement manquantes");
    return NextResponse.json(
      { error: "Configuration serveur incomplète" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Signature webhook invalide", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (!email) {
      console.error("Paiement confirmé sans email", session.id);
      return NextResponse.json({ received: true });
    }

    const { error: insertError } = await supabase.from("purchases").insert({
      email,
      stripe_session_id: session.id,
      amount_cents: session.amount_total ?? 0,
      status: "paid",
    });

    if (!insertError) {
            const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
        email,
        { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/compte` }
      );
      if (inviteError) {
        console.error("Erreur invitation Supabase", inviteError);
      } else {
        console.log("✅ Compte créé et email envoyé à", email);
      }
    } else if (insertError.code === "23505") {
      console.log("Paiement déjà traité (doublon ignoré) :", session.id);
    } else {
      console.error("Erreur insertion purchases", insertError);
    }
  }

  return NextResponse.json({ received: true });
}
