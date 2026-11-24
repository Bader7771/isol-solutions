import React, { useState } from "react";
import { projectTypes, requestVisit } from "./enquiry-api";
import "./enquiry.css";

const contactFields = [
  {
    name: "fullName",
    label: "Nom complet",
    autoComplete: "name",
    maxLength: 150,
  },
  {
    name: "company",
    label: "Entreprise ou établissement",
    autoComplete: "organization",
    maxLength: 200,
  },
  {
    name: "email",
    label: "Adresse email",
    type: "email",
    autoComplete: "email",
    maxLength: 254,
  },
  {
    name: "phone",
    label: "Téléphone",
    type: "tel",
    autoComplete: "tel",
    maxLength: 32,
    pattern: String.raw`(?=(?:\D*\d){7,15}\D*$)\+?[0-9 .\(\)\-]+`,
    title:
      "Saisissez un numéro de 7 à 15 chiffres, avec son indicatif si nécessaire.",
  },
];

export default function EnquiryPage({
  contact,
  initialProjectType = "",
  initialDescription = "",
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const project = projectTypes.find(
    ([id, label]) => initialProjectType === id || initialProjectType === label,
  );
  const phone = contact?.whatsapp;
  const email = contact?.email;
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 10);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const reference = await requestVisit(new FormData(event.currentTarget));
      setReceipt(reference);
    } catch (failure) {
      setError(
        failure instanceof TypeError
          ? "Connexion interrompue. Vérifiez votre connexion et réessayez."
          : failure.message,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="enquiry-page" id="main-content">
      <header className="enquiry-intro">
        <div>
          <p className="enquiry-kicker">Contact & devis</p>
          <h1>Demander une visite technique</h1>
          <p>
            Décrivez votre chantier, sa localisation et son calendrier. Notre
            équipe étudiera les documents transmis pour préparer un échange
            technique adapté.
          </p>
        </div>
        <aside aria-label="Contacter directement l’équipe">
          <h2>Échanger avec l’équipe</h2>
          {phone && (
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent("Bonjour ISOL SOLUTIONS, je souhaite organiser une visite technique pour mon projet.")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp · +{phone}
            </a>
          )}
          {email && <a href={"mailto:" + email}>{email}</a>}
        </aside>
      </header>
      {receipt ? (
        <section className="enquiry-receipt" role="status">
          <h2>Votre demande est enregistrée.</h2>
          <p>
            Notre équipe dispose des éléments transmis pour vous recontacter.
            Conservez la référence de votre demande.
          </p>
          <p>
            <strong>{receipt}</strong>
          </p>
          <button type="button" onClick={() => setReceipt("")}>
            Présenter un autre projet
          </button>
        </section>
      ) : (
        <form className="enquiry-form" onSubmit={submit}>
          <fieldset disabled={busy}>
            <legend>Vos coordonnées</legend>
            <div className="enquiry-fields">
              {contactFields.map(({ name, label, ...attributes }) => (
                <label key={name}>
                  {label}
                  <input name={name} type="text" {...attributes} required />
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset disabled={busy}>
            <legend>Votre chantier</legend>
            <div className="enquiry-fields">
              <label>
                Type de projet
                <select
                  name="projectType"
                  defaultValue={project?.[0] || ""}
                  required
                >
                  <option value="" disabled>
                    Sélectionner un pôle
                  </option>
                  {projectTypes.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Ville du chantier
                <input
                  name="city"
                  autoComplete="address-level2"
                  maxLength={150}
                  required
                />
              </label>
              <label>
                Surface estimée en m² <small>(facultatif)</small>
                <input
                  name="surface"
                  type="number"
                  min="0.01"
                  max="999999999.99"
                  step="0.01"
                  inputMode="decimal"
                />
              </label>
              <label>
                Échéance souhaitée <small>(facultatif)</small>
                <input name="deadline" type="date" min={localDate} />
              </label>
              <label className="enquiry-wide">
                Description du projet
                <textarea
                  name="description"
                  defaultValue={initialDescription}
                  rows={5}
                  minLength={10}
                  maxLength={8000}
                  required
                  placeholder="Usage du local, contraintes d’accès, travaux prévus et stade d’avancement…"
                />
              </label>
              <label className="enquiry-wide">
                Joindre un plan ou un document{" "}
                <small>(facultatif, PDF de 5 Mo maximum)</small>
                <input type="file" name="plan" accept=".pdf,application/pdf" />
              </label>
            </div>
          </fieldset>
          <label className="enquiry-consent">
            <input type="checkbox" name="consent" required disabled={busy} />
            J’accepte que mes coordonnées et mon dossier soient utilisés pour
            traiter cette demande.
          </label>
          {error && (
            <p className="enquiry-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy}>
            {busy ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>
        </form>
      )}
    </main>
  );
}
