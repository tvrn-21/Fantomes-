"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type DetectedSub = {
  label: string;
  amount_cents: number;
  occurrences: number;
  annual_amount_cents: number;
};

function buildLetter(label: string): string {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `[Votre nom]
[Votre adresse]

${label}
[Adresse du service — à compléter]

Fait à [Votre ville], le ${today}

Objet : Résiliation de mon abonnement

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon abonnement à ${label}, à compter de ce jour.

Je vous remercie de bien vouloir prendre en compte cette demande dans les meilleurs délais et de m'en confirmer la bonne réception par écrit.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

[Votre nom]`;
}

export default function Compte() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "sending" | "done" | "error"
  >("idle");
  const [lineCount, setLineCount] = useState(0);
  const [results, setResults] = useState<DetectedSub[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/compte` },
    });
    if (error) {
      alert("Erreur : " + error.message);
    } else {
      setLinkSent(true);
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !session) return;

    setUploadStatus("sending");
    const text = await file.text();
    const rawLines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const parsed = rawLines.map((raw_line) => {
      const parts = raw_line.split(";");
      if (parts.length < 3) {
        return {
          raw_line,
          label: null as string | null,
          amount_cents: null as number | null,
          line_date: null as string | null,
        };
      }
      const [datePart, labelPart, amountPart] = parts;
      const dateMatch = datePart.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      const line_date = dateMatch
        ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`
        : null;

      const normalizedAmount = amountPart
        .trim()
        .replace(",", ".")
        .replace(/\s/g, "");
      const amountFloat = parseFloat(normalizedAmount);
      const amount_cents = isNaN(amountFloat)
        ? null
        : Math.round(amountFloat * 100);

      return { raw_line, label: labelPart.trim(), amount_cents, line_date };
    });

    const rows = parsed.map((p) => ({
      user_id: session.user.id,
      raw_line: p.raw_line,
      label: p.label,
      amount_cents: p.amount_cents,
      line_date: p.line_date,
    }));

    const { error: insertLinesError } = await supabase
      .from("statement_lines")
      .insert(rows);

    if (insertLinesError) {
      console.error(insertLinesError);
      setUploadStatus("error");
      return;
    }

    const groups = new Map<
      string,
      { label: string; amount_cents: number; count: number }
    >();

    for (const p of parsed) {
      if (p.label === null || p.amount_cents === null) continue;
      if (p.amount_cents >= 0) continue;

      const key = `${p.label.toLowerCase()}|${p.amount_cents}`;
      const existing = groups.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        groups.set(key, {
          label: p.label,
          amount_cents: p.amount_cents,
          count: 1,
        });
      }
    }

    const detected = Array.from(groups.values())
      .filter((g) => g.count >= 2)
      .map((g) => ({
        label: g.label,
        amount_cents: Math.abs(g.amount_cents),
        occurrences: g.count,
        annual_amount_cents: Math.abs(g.amount_cents) * 12,
      }))
      .sort((a, b) => b.annual_amount_cents - a.annual_amount_cents);

    await supabase.from("subscriptions").delete().eq("user_id", session.user.id);

    if (detected.length > 0) {
      await supabase.from("subscriptions").insert(
        detected.map((d) => ({
          user_id: session.user.id,
          label: d.label,
          amount_cents: d.amount_cents,
          occurrences: d.occurrences,
          annual_amount_cents: d.annual_amount_cents,
        }))
      );
    }

    setResults(detected);
    setLineCount(parsed.length);
    setUploadStatus("done");
  }

  async function handleCopy(index: number, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      alert("Impossible de copier automatiquement — sélectionnez le texte manuellement.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-ink/50">Chargement…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-serif italic text-lg mb-10">Fantômes</p>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-6 max-w-sm">
          Connectez-vous pour déposer votre relevé
        </h1>
        {linkSent ? (
          <p className="text-ink/70 max-w-sm">
            Un lien de connexion vient d&rsquo;être envoyé à {email}. Ouvrez-le
            depuis votre boîte mail.
          </p>
        ) : (
          <form onSubmit={handleSendLink} className="w-full max-w-xs space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full rounded-lg border border-ink/20 px-4 py-3 text-center"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-ink text-cream font-medium px-8 py-3 hover:bg-ink/85 transition-colors"
            >
              Recevoir le lien de connexion
            </button>
          </form>
        )}
      </main>
    );
  }

  const totalAnnualCents = results.reduce(
    (sum, r) => sum + r.annual_amount_cents,
    0
  );

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <p className="font-serif italic text-lg mb-10">Fantômes</p>

        {uploadStatus === "done" ? (
          <>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-2">
              {results.length} abonnement{results.length > 1 ? "s" : ""} détecté
              {results.length > 1 ? "s" : ""}
            </h1>
            {results.length > 0 && (
              <p className="text-ink/70 mb-10">
                Soit {(totalAnnualCents / 100).toFixed(2)} € par an
              </p>
            )}

            {results.length === 0 ? (
              <p className="text-ink/70">
                Aucun prélèvement répété trouvé sur ces {lineCount} lignes.
              </p>
            ) : (
              <ul className="text-left divide-y divide-ink/10 border-y border-ink/10">
                {results.map((r, i) => (
                  <li key={i} className="py-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-medium">{r.label}</span>
                      <span className="text-ink/60 text-sm">
                        {(r.annual_amount_cents / 100).toFixed(2)} €/an
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === i ? null : i)
                      }
                      className="text-sm underline underline-offset-4 text-ink/70"
                    >
                      {openIndex === i
                        ? "Masquer la lettre"
                        : "Voir la lettre de résiliation"}
                    </button>

                    {openIndex === i && (
                      <div className="mt-4 bg-white/60 border border-ink/10 rounded-xl p-4">
                        <pre className="whitespace-pre-wrap text-sm text-ink/80 font-sans mb-4">
                          {buildLetter(r.label)}
                        </pre>
                        <button
                          onClick={() => handleCopy(i, buildLetter(r.label))}
                          className="text-sm rounded-full bg-ink text-cream px-5 py-2 hover:bg-ink/85 transition-colors"
                        >
                          {copiedIndex === i ? "Copié ✓" : "Copier la lettre"}
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-6">
              Déposez votre relevé bancaire
            </h1>
            <p className="text-ink/70 mb-10">
              Exportez votre relevé au format CSV depuis votre banque en ligne,
              puis déposez-le ici.
            </p>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="file"
                accept=".csv,text/csv"
                required
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm"
              />
              <button
                type="submit"
                disabled={uploadStatus === "sending"}
                className="w-full rounded-full bg-ink text-cream font-medium px-8 py-3 hover:bg-ink/85 transition-colors disabled:opacity-50"
              >
                {uploadStatus === "sending" ? "Analyse…" : "Envoyer mon relevé"}
              </button>
              {uploadStatus === "error" && (
                <p className="text-sm text-red-600">
                  Une erreur est survenue, réessayez.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
