import React from "react";

export default function Contact({ sendContact, service, contact }) {
  return (
    <>
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact__wrapper">
            <div className="contact__info">
              <span className="section-label">Contactez-nous</span>
              <h2 className="section-title">
                Contactez nos experts dès aujourd'hui
              </h2>
              <p className="contact__description">
                Notre équipe technique est à votre disposition pour étudier
                votre projet et vous proposer les meilleures solutions
                d'isolation.
              </p>

              <div className="contact__details">
                <div className="contact__detail">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <div>
                    <h4>Adresse</h4>
                    <p>{contact.address}</p>
                  </div>
                </div>

                <div className="contact__detail">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1469 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <h4>Téléphone</h4>
                    <p>
                      <a href={"tel:+" + contact.whatsapp}>
                        +{contact.whatsapp}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact__detail">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6L12 13L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <h4>Email</h4>
                    <p>
                      <a href={"mailto:" + contact.email}>{contact.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form
              className="contact__form"
              id="contact-form"
              onSubmit={sendContact}
            >
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength="100"
                  autoComplete="name"
                />
                <span className="form-error" id="name-error"></span>
              </div>

              <div className="form-group">
                <label htmlFor="company">Entreprise *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  maxLength="100"
                  autoComplete="organization"
                />
                <span className="form-error" id="company-error"></span>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength="100"
                  autoComplete="email"
                />
                <span className="form-error" id="email-error"></span>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Téléphone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  maxLength="20"
                  autoComplete="tel"
                />
                <span className="form-error" id="phone-error"></span>
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="message">Message *</label>
                <textarea
                  defaultValue={service}
                  id="message"
                  name="message"
                  rows="5"
                  required
                  maxLength="1000"
                ></textarea>
                <span className="form-error" id="message-error"></span>
              </div>

              <div className="form-group form-group--full">
                <label className="checkbox-label">
                  <input type="checkbox" id="consent" name="consent" required />
                  <span>
                    J'accepte que mes données soient utilisées pour me
                    recontacter concernant ma demande. *
                  </span>
                </label>
                <span className="form-error" id="consent-error"></span>
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--large"
                id="submit-btn"
              >
                <span>Envoyer ma demande</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <p className="form-notice">
                * Champs obligatoires. Vos données sont protégées conformément
                au RGPD.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
