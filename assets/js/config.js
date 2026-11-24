// Contact information retained from the existing website. Add verified social URLs here.
export const CONTACT = Object.freeze({
  whatsapp: "212619949817",
  email: "contact@isolmaroc.ma",
  address: "Casablanca, Maroc",
  instagram: "",
  facebook: "",
  contactEndpoint: "https://api.sheetmonkey.io/form/2j5wNcYrK2EWGV6uKbG6SU",
});
export function quoteMessage(product) {
  if (!product)
    return "Bonjour Isolmaroc, je souhaite échanger avec votre équipe concernant mon projet d’isolation acoustique et thermique.";
  const reference = product.specifications?.["Référence"];
  return `Bonjour Isolmaroc,\n\nJe souhaite obtenir un devis concernant votre produit : ${product.product_name}.${reference ? `\nRéférence : ${reference}.` : ""}\n\nPourriez-vous me communiquer les informations complémentaires et les conditions commerciales ?\n\nMerci.`;
}
export const whatsappURL = (product) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(quoteMessage(product))}`;
export const emailURL = (product) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(product ? `Demande de devis — ${product.product_name}` : "Projet d’isolation — Demande de renseignements")}&body=${encodeURIComponent(quoteMessage(product))}`;
