export default function MentionsLegales() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl font-semibold mb-8">
        Mentions légales
      </h1>

      <div className="space-y-6 text-ink/80 leading-relaxed">
        <section>
          <h2 className="font-semibold text-ink mb-2">Éditeur du site</h2>
          <p>
            [À COMPLÉTER — nom et prénom]
            <br />
            Indépendant, domicilié en Suisse
            <br />
            Adresse : [À COMPLÉTER]
            <br />
            Email de contact : [À COMPLÉTER]
            <br />
            Numéro IDE (si applicable) : [À COMPLÉTER]
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">Propriété intellectuelle</h2>
          <p>
            L&rsquo;ensemble du contenu de ce site (textes, visuels, marque
            &laquo;&nbsp;Fantômes&nbsp;&raquo;) est la propriété de l&rsquo;éditeur,
            sauf mention contraire.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">Contact</h2>
          <p>
            Pour toute question concernant ce site ou le service, écrivez à
            [À COMPLÉTER — email de contact].
          </p>
        </section>
      </div>
    </main>
  );
}
