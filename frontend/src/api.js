async function request(path, options) {
  const response = await fetch(path, options);
  if (!response.ok)
    throw new Error(
      response.status === 404
        ? "Produit introuvable."
        : "Service momentanément inaccessible.",
    );
  return response.json();
}
export const fetchCatalog = () => request("/api/catalog");
export const fetchProduct = (id) =>
  request("/api/products/" + encodeURIComponent(id));
export const submitQuote = (quote) =>
  request("/api/devis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote),
  });

export const fetchCompany = () => request("/api/company");
export const submitContact = (contact) =>
  request("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
