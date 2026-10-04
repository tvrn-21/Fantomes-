export default function Confidentialite() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl font-semibold mb-8">
        Politique de confidentialité
      </h1>

      <div className="space-y-6 text-ink/80 leading-relaxed">
        <section>
          <h2 className="font-semibold text-ink mb-2">Données collectées</h2>
          <p>
            Nous collectons votre adresse email (pour créer votre compte et
            vous contacter) et le contenu du relevé bancaire que vous
            déposez volontairement, afin de détecter vos prélèvements
            récurrents.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">Utilisation des données</h2>
          <p>
            Ces données sont utilisées uniquement pour vous fournir le
            service demandé. Elles ne sont ni vendues, ni partagées avec des
            tiers à des fins commerciales.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">Hébergement des données</h2>
          <p>
            Vos données sont stockées via Supabase (hébergement en Europe)
            et les paiements sont traités par Stripe, qui ne nous
            transmet jamais vos coordonnées bancaires complètes.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">Vos droits</h2>
          <p>
            Vous pouvez demander l&rsquo;accès, la rectification ou la
            suppression de vos données à tout moment en écrivant à
            [À COMPLÉTER — email de contact].
          </p>
        </section>
      </div>
    </main>
  );
}
