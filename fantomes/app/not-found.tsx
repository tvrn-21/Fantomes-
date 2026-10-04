import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl font-semibold mb-4">
        Page introuvable
      </h1>
      <p className="text-ink/70 mb-8">Cette page n&rsquo;existe pas ou plus.</p>
      <Link
        href="/"
        className="rounded-full bg-ink text-cream font-medium px-6 py-3"
      >
        Retour à l&rsquo;accueil
      </Link>
    </main>
  );
}
