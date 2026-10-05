import Logo from "@/components/Logo";
export default function Home({
  searchParams,
}: {
  searchParams: { paiement?: string };
}) {
  const paiementAnnule = searchParams.paiement === "annule";
  const paiementErreur = searchParams.paiement === "erreur";

  return (
    <main className="min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-xl flex-1 flex flex-col justify-center px-6 py-14">
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

        <h1 className="font-serif text-[2.3rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-semibold mb-6 max-w-md">
          Vous payez certainement des abonnements que vous n&rsquo;utilisez
          plus
        </h1>

        <p className="text-lg text-ink/70 max-w-md mb-12 leading-relaxed">
          Un essai jamais résilié, un service remplacé, une option activée
          une fois. Trop petits pour se voir sur un relevé, ils tournent
          pendant des années.
        </p>

        <ul className="mb-12 divide-y divide-ink/10 border-y border-ink/10">
          <Benefit title="On lit votre relevé bancaire">
            Déposez-le, on repère les prélèvements réguliers. nous ne voyons aucune données personelle, nous voyons uniquement les paiment qui sont dans le relevé bancaire
          </Benefit>
          <Benefit title="On chiffre ce que ça vous coûte">
            Chaque abonnement classé par montant annuel, pas mensuel — pour
            voir le vrai coût.
          </Benefit>
          <Benefit title="On rédige la résiliation">
            Une lettre prête à envoyer pour chaque abonnement inutile.
          </Benefit>
          <Benefit title="Comment trouver votre relever bancaire et le télécharger sous le bon format ?">
            Depuis votre banque en ligne, allez dans relever de compte, et ensuite trouver le bouton télécharger les données du compte, choisissez la durée souhaiter (1 ans recommander) et telecharger, ce sera en format pdf. Allez ensuite sur l'IA de votre choix pour transformet le fichier pdf en fichier.csv
            </Benefit>
            <Benefit title="Des questions ?">
              si vous avez des questions sur quoi qe ce soit, vous pouvez ecrire un mail a l'adresse ci-dessous, nous vous réponderons le plus rapidement possible. fantomes.admin@gmail.com
          </Benefit>
        </ul>

        <a
          href="/api/checkout"
          className="inline-flex items-center justify-center rounded-full bg-ink text-cream font-medium text-lg px-8 py-4 hover:bg-ink/85 transition-colors w-full sm:w-auto"
        >
          Débusquer mes Fantômes — 19&nbsp;€
        </a>
        <p className="mt-4 text-sm text-ink/50">
          Paiement unique, sans engagement.
        </p>
      </div>
    </main>
  );
}

function Benefit({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="py-5">
      <p className="font-medium mb-1">{title}</p>
      <p className="text-sm text-ink/60 leading-relaxed">{children}</p>
    </li>
  );
}
