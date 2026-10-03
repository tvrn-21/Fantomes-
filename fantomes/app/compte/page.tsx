"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
    const { error } = await supabase.auth.signInWithOtp({ email });
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
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const rows = lines.map((raw_line) => ({
      user_id: session.user.id,
      raw_line,
    }));

    const { error } = await supabase.from("statement_lines").insert(rows);

    if (error) {
      console.error(error);
      setUploadStatus("error");
    } else {
      setLineCount(lines.length);
      setUploadStatus("done");
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>

      {uploadStatus === "done" ? (
        <>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-4 max-w-sm">
            Relevé reçu — {lineCount} lignes enregistrées
          </h1>
          <p className="text-ink/70 max-w-sm">
            On analyse vos prélèvements. Cette partie arrive à l&rsquo;étape
            suivante du produit.
          </p>
        </>
      ) : (
        <>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-6 max-w-sm">
            Déposez votre relevé bancaire
          </h1>
          <p className="text-ink/70 max-w-sm mb-10">
            Exportez votre relevé au format CSV depuis votre banque en ligne,
            puis déposez-le ici.
          </p>
          <form onSubmit={handleUpload} className="w-full max-w-xs space-y-4">
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
              {uploadStatus === "sending" ? "Envoi…" : "Envoyer mon relevé"}
            </button>
            {uploadStatus === "error" && (
              <p className="text-sm text-red-600">
                Une erreur est survenue, réessayez.
              </p>
            )}
          </form>
        </>
      )}
    </main>
  );
}
