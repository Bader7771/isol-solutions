export const projectTypes = [
  ["sante", "Santé & radioprotection"],
  ["acoustique", "Acoustique"],
  ["thermique", "Isolation thermique & enveloppe"],
  ["btp", "BTP & aménagement"],
  ["autre", "Projet multidisciplinaire ou autre"],
];

export async function requestVisit(fields) {
  const plan = fields.get("plan");
  const request = Object.fromEntries(fields);
  delete request.plan;
  request.consent = fields.has("consent");
  request.surface = request.surface === "" ? null : Number(request.surface);
  request.deadline = request.deadline || null;
  const data = new FormData();
  data.append(
    "request",
    new Blob([JSON.stringify(request)], { type: "application/json" }),
  );
  if (plan?.name) {
    if (plan.size > 5 * 1024 * 1024)
      throw new Error(
        "Votre plan dépasse 5 Mo. Choisissez un fichier plus léger.",
      );
    data.append("plan", plan);
  }
  const response = await fetch("/api/enquiries", {
    method: "POST",
    body: data,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.reference) {
    throw new Error(
      result.message ||
        "L’envoi a échoué. Vous pouvez réessayer ou joindre directement notre équipe.",
    );
  }
  return result.reference;
}
