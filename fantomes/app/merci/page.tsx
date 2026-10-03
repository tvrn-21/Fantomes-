export default function Merci() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-6 max-w-md leading-tight">
        Paiement reçu. Votre audit est en route.
      </h1>
      <p className="text-ink/70 max-w-sm leading-relaxed mb-8">
        Vous allez recevoir un email avec un lien de connexion. Ouvrez-le pour
        déposer votre relevé bancaire.
      </p>
      <a
        href="/compte"
        className="text-sm text-ink underline underline-offset-4"
      >
        J&rsquo;ai déjà mon lien, aller à mon espace
      </a>
    </main>
  );
}
