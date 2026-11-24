export function quoteMessage(product) {
  if (!product)
    return "Bonjour ISOL SOLUTIONS, je souhaite échanger avec votre équipe concernant mon projet d’isolation acoustique et thermique.";
  const reference = product.specifications?.["Référence"];
  return `Bonjour ISOL SOLUTIONS,\n\nJe souhaite obtenir un devis concernant votre produit : ${product.product_name}.${reference ? `\nRéférence : ${reference}.` : ""}\n\nPourriez-vous me communiquer les informations complémentaires et les conditions commerciales ?\n\nMerci.`;
}
export const whatsappURL = (product, contact) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(quoteMessage(product))}`;
export const emailURL = (product, contact) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(product ? `Demande de devis — ${product.product_name}` : "Projet d’isolation — Demande de renseignements")}&body=${encodeURIComponent(quoteMessage(product))}`;
