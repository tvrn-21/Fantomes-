import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!siteUrl || !secretKey) {
    console.error("Variables d'environnement Stripe manquantes");
    return NextResponse.json(
      { error: "Configuration serveur incomplète" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Audit Fantômes",
              description:
                "Analyse de votre relevé bancaire et détection de vos abonnements oubliés.",
            },
                        unit_amount: 900,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?paiement=annule`,
    });

    if (!session.url) {
      throw new Error("Session Stripe créée sans URL");
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    console.error("Erreur création session Stripe", err);
    return NextResponse.redirect(`${siteUrl}/?paiement=erreur`, {
      status: 303,
    });
  }
}
