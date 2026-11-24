import React from "react";

export default function Privacy() {
  return (
    <>
      <main id="main-content">
        <article className="wrap policy-content">
          <p className="eyebrow">Isolmaroc · Isolsolutions</p>
          <h1>
            Vos informations,
            <br />
            votre demande.
          </h1>
          <p>
            Cette page décrit l’utilisation des informations que vous
            transmettez via le formulaire de contact de ce site.
          </p>
          <h2>Les informations transmises</h2>
          <p>
            Le formulaire recueille votre nom, votre adresse email, votre
            message et, si vous les renseignez, votre entreprise et votre
            téléphone. Ces informations permettent à notre équipe de comprendre
            votre projet et de vous recontacter.
          </p>
          <h2>L’envoi de votre demande</h2>
          <p>
            Le formulaire utilise le service SheetMonkey pour transmettre les
            demandes à l’équipe. Les champs saisis et la date de la demande sont
            envoyés à ce service lors de la soumission.
          </p>
          <h2>WhatsApp et email</h2>
          <p>
            Les boutons WhatsApp ouvrent une conversation avec un message
            préparé. Vous choisissez de l’envoyer dans WhatsApp. Les liens email
            ouvrent votre application de messagerie. Ces services appliquent
            leurs propres conditions de confidentialité.
          </p>
          <h2>Nous contacter</h2>
          <p>
            Pour toute question concernant vos informations ou pour demander
            leur correction ou leur suppression, écrivez à
            <a href="mailto:contact@isolmaroc.ma">contact@isolmaroc.ma</a>.
          </p>
          <a className="button button-primary" href="index.html#contact">
            Retour au formulaire
          </a>
        </article>
      </main>
    </>
  );
}
