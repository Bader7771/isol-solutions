// Existing company services, shared by the homepage and service detail route.
export const SERVICES = Object.freeze([
  {
    id: "etude",
    icon: "plan",
    title: "Étude & diagnostic",
    description:
      "Comprendre votre environnement avant de choisir une solution.",
    body: "À partir de vos plans, de votre cahier des charges et des usages du bâtiment, notre équipe étudie les contraintes acoustiques et thermiques de votre projet.",
    points: [
      "Analyse des plans et du cahier des charges",
      "Diagnostic acoustique selon les besoins du projet",
      "Évaluation des contraintes techniques",
    ],
    image: "assets/images/Sectors Section/sector-bureaux.png",
  },
  {
    id: "conseil",
    icon: "layers",
    title: "Conseil & sélection des matériaux",
    description: "Associer la bonne matière à la bonne application.",
    body: "Panneaux acoustiques, laines minérales, portes isolées ou solutions industrielles : nous vous accompagnons dans la sélection des matériaux et le dimensionnement de votre solution.",
    points: [
      "Choix des matériaux adaptés à vos usages",
      "Proposition technique et dimensionnement",
      "Devis détaillé et planification",
    ],
    image: "assets/images/solution-images/panneaux-acoustiques.png",
  },
  {
    id: "livraison",
    icon: "truck",
    title: "Approvisionnement & accompagnement",
    description: "Relier la proposition technique à votre chantier.",
    body: "Après validation de la proposition, nous organisons l’approvisionnement, la coordination logistique et la livraison des matériaux. Le suivi technique est défini selon les besoins de votre chantier.",
    points: [
      "Coordination des approvisionnements",
      "Livraison sur site partout au Maroc",
      "Suivi technique selon les besoins du chantier",
    ],
    image: "assets/images/Sectors Section/sector-industrie.png",
  },
]);
