"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl font-semibold mb-4">
        Une erreur est survenue
      </h1>
      <p className="text-ink/70 mb-8">Essayez de recharger la page.</p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-ink text-cream font-medium px-6 py-3"
      >
        Réessayer
      </button>
    </main>
  );
}
