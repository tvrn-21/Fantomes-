import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["600", "700"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "700"],
});

const description =
  "Déposez votre relevé bancaire : on retrouve vos prélèvements oubliés et on chiffre ce qu'ils vous coûtent par an.";

export const metadata: Metadata = {
  title: "Fantômes — les abonnements que vous payez sans vous en servir",
  description,
  openGraph: {
    title: "Fantômes — les abonnements que vous payez sans vous en servir",
    description,
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${publicSans.variable} font-sans bg-cream text-ink antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
