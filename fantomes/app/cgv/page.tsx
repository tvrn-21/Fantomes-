export default function CGV() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <p className="font-serif italic text-lg mb-10">Fantômes</p>
      <h1 className="font-serif text-3xl font-semibold mb-8">
        Conditions générales de vente
      </h1>

      <div className="space-y-6 text-ink/80 leading-relaxed">
        <section>
          <h2 className="font-semibold text-ink mb-2">1. Objet</h2>
          <p>
            Les présentes conditions régissent la vente du service
            &laquo;&nbsp;Fantômes&nbsp;&raquo; : une analyse du relevé bancaire
            déposé par le client, visant à identifier les prélèvements
            récurrents, accompagnée d&rsquo;un modèle de lettre de
            résiliation pour chacun.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">2. Prix</h2>
          <p>
            Le service est proposé au prix de 19 € (ou équivalent en CHF
            selon le mode de paiement), payable en une fois au moment de la
            commande.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">3. Livraison</h2>
          <p>
            L&rsquo;accès au service est délivré immédiatement après
            paiement, par la création automatique d&rsquo;un compte et
            l&rsquo;envoi d&rsquo;un lien de connexion par email.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">4. Droit de rétractation</h2>
          <p>
            [À COMPLÉTER — ce point dépend du pays de résidence du client et
            du statut légal du vendeur ; à valider avec un professionnel
            avant mise en production, notamment pour les clients résidant
            dans l&rsquo;Union européenne.]
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">5. Responsabilité</h2>
          <p>
            Le service fournit une analyse automatisée à titre indicatif.
            Il appartient au client de vérifier l&rsquo;exactitude des
            informations avant d&rsquo;envoyer toute lettre de résiliation.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-ink mb-2">6. Droit applicable</h2>
          <p>[À COMPLÉTER — à déterminer avec un professionnel]</p>
        </section>
      </div>
    </main>
  );
}
