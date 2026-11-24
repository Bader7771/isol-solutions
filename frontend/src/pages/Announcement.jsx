import React from "react";
export default function Announcement() {
  return (
    <>
      <div className="announcement-bar" id="announcement-bar">
        <a href="diagnostic.html" className="announcement-bar__link">
          <div className="announcement-bar__track">
            <span className="announcement-bar__text">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Mesure acoustique professionnelle pour vos locaux industriels,
              bureaux et bâtiments – Demandez votre diagnostic
            </span>
            <span className="announcement-bar__text" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Mesure acoustique professionnelle pour vos locaux industriels,
              bureaux et bâtiments – Demandez votre diagnostic
            </span>
          </div>
        </a>
      </div>
    </>
  );
}
