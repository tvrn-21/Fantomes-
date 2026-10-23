import Logo from "@/components/Logo";

export default function Home({
  searchParams,
}: {
  searchParams: { paiement?: string };
}) {
  const paiementAnnule = searchParams.paiement === "annule";
  const paiementErreur = searchParams.paiement === "erreur";

  return (
    <main className="min-h-screen flex flex-col overflow-hidden relative">
      <div
        className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full opacity-[0.08] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C68A2E, transparent 70%)" }}
      />

      <div className="mx-auto w-full max-w-xl flex-1 flex flex-col justify-center px-6 py-14 relative">
        {(paiementErreur || paiementAnnule) && (
          <p
            className={`mb-8 rounded-lg px-4 py-3 text-sm ${
              paiementErreur
                ? "bg-red-50 text-red-700"
                : "bg-ink/5 text-ink/70"
            }`}
          >
            {paiementErreur
              ? "Le paiement n'a pas abouti. Réessayez, ou écrivez-nous si ça persiste."
              : "Paiement annulé — vous pouvez recommencer quand vous voulez."}
          </p>
        )}

        <Logo />

        <h1 className="animate-fade-up font-serif text-[2.3rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-semibold mb-6 max-w-md">
          Vous payez sans doute pour des abonnements que vous n&rsquo;utilisez
          plus
        </h1>

        <p
          className="animate-fade-up text-lg text-ink/70 max-w-md mb-12 leading-relaxed"
          style={{ animationDelay: "0.1s" }}
        >
          Un essai jamais résilié, un service remplacé, une option activée
          une fois. Trop petits pour se voir sur un relevé, ils tournent
          pendant des années.
        </p>

        <ul className="mb-12 divide-y divide-ink/10 border-y border-ink/10">
          <Benefit
            icon={<IconDocument />}
            title="On lit votre relevé bancaire"
            delay="0.2s"
          >
            Déposez-le, on repère les prélèvements réguliers.
          </Benefit>
          <Benefit
            icon={<IconChart />}
            title="On chiffre ce que ça vous coûte"
            delay="0.3s"
          >
            Chaque abonnement classé par montant annuel, pas mensuel — pour
            voir le vrai coût.
          </Benefit>
          <Benefit
            icon={<IconLetter />}
            title="On rédige la résiliation"
            delay="0.4s"
          >
            Une lettre prête à envoyer pour chaque abonnement inutile.
          </Benefit>
        </ul>

        <div
          className="animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="mb-3 text-sm font-medium text-gold">
            Offre de lancement
          </p>
          <a
            href="/api/checkout"
            className="inline-flex items-center justify-center rounded-full bg-ink text-cream font-medium text-lg px-8 py-4 hover:bg-ink/85 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            Débusquer mes Fantômes —{" "}
            <span className="line-through opacity-50 mr-1">19 €</span> 9&nbsp;€
          </a>
          <p className="mt-4 text-sm text-ink/50">
            Paiement unique, sans engagement.
          </p>
        </div>
      </div>
    </main>
  );
}

function Benefit({
  icon,
  title,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  delay: string;
  children: React.ReactNode;
}) {
  return (
    <li
      className="animate-fade-up py-5 flex gap-4 items-start"
      style={{ animationDelay: delay }}
    >
      <div className="shrink-0 w-9 h-9 rounded-full bg-ink/5 flex items-center justify-center text-ink/70">
        {icon}
      </div>
      <div>
        <p className="font-medium mb-1">{title}</p>
        <p className="text-sm text-ink/60 leading-relaxed">{children}</p>
      </div>
    </li>
  );
}

function IconDocument() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2h9l5 5v15a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 20h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLetter() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
 
