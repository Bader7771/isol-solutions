import React, { useRef, useState } from "react";
import { submitQuote } from "../../api.js";
export default function QuoteDialog({ product }) {
  const dialog = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function send(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === "sending" || !form.reportValidity()) return;
    setStatus("sending");
    setError("");
    try {
      const values = Object.fromEntries(new FormData(form));
      const ref = product.specifications["Référence"];
      await submitQuote({
        ...values,
        produit: ref
          ? product.product_name + " — " + ref
          : product.product_name,
      });
      setStatus("sent");
      form.reset();
    } catch (e) {
      setStatus("idle");
      setError(e.message);
    }
  }
  const fields = [
    ["nom", "Nom complet", "text", "name", true, 100],
    ["email", "Email", "email", "email", true, 100],
    ["entreprise", "Entreprise", "text", "organization", false, 100],
    ["telephone", "Téléphone", "tel", "tel", false, 20],
  ];
  return (
    <>
      <button
        id="btn-devis"
        type="button"
        className="cat-action"
        onClick={() => {
          setStatus("idle");
          setError("");
          dialog.current.showModal();
        }}
      >
        Demander un devis <span aria-hidden="true">↗</span>
      </button>
      <dialog
        className="cat-dialog"
        ref={dialog}
        aria-labelledby="catalog-quote-title"
        onCancel={(e) => {
          if (status === "sending") e.preventDefault();
        }}
      >
        <button
          className="cat-close"
          disabled={status === "sending"}
          type="button"
          onClick={() => dialog.current.close()}
          aria-label="Fermer"
        >
          ×
        </button>
        {status === "sent" ? (
          <div id="quote-success" role="status">
            <h2 id="catalog-quote-title">Demande reçue</h2>
            <p>
              Votre demande de devis pour {product.product_name} a été
              enregistrée.
            </p>
            <button
              type="button"
              className="cat-action"
              onClick={() => dialog.current.close()}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h2 id="catalog-quote-title">Demander un devis</h2>
            <p>{product.product_name}</p>
            <form id="quote-form" onSubmit={send} className="cat-form">
              {fields.map(
                ([key, label, type, autocomplete, required, maxLength]) => (
                  <label key={key}>
                    {label}
                    {required ? " *" : ""}
                    <input
                      name={key}
                      id={"devis-" + key}
                      type={type}
                      autoComplete={autocomplete}
                      required={required}
                      maxLength={maxLength}
                    />
                  </label>
                ),
              )}
              <label className="cat-form-full">
                Votre demande *
                <textarea
                  name="message"
                  id="devis-message"
                  rows="4"
                  maxLength={1000}
                  required
                  placeholder="Quantités, ville du chantier et délai souhaité"
                />
              </label>
              {error && (
                <p className="cat-form-full" role="alert">
                  {error}
                </p>
              )}
              <button
                className="cat-action cat-form-full"
                id="devis-submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Envoi en cours…"
                  : "Envoyer la demande"}
              </button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
