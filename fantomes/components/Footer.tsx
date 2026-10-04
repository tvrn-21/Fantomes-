export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center text-xs text-ink/40">
      <a href="/mentions-legales" className="hover:text-ink/70">
        Mentions légales
      </a>
      <span className="mx-3">·</span>
      <a href="/cgv" className="hover:text-ink/70">
        CGV
      </a>
      <span className="mx-3">·</span>
      <a href="/confidentialite" className="hover:text-ink/70">
        Confidentialité
      </a>
    </footer>
  );
}
