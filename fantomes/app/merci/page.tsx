export default function Merci() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-6 max-w-md leading-tight">
        Paiement reçu. Votre audit est en route.
      </h1>
      <p className="text-ink/70 max-w-sm leading-relaxed">
        Vous allez recevoir un email dans les prochaines heures avec les
        instructions pour nous envoyer votre relevé bancaire. Vérifiez vos
        spams si vous ne le voyez pas passer.
      </p>
    </main>
  );
}
