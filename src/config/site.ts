// Réglages du site : sections affichées et coordonnées publiques.
// Passer une section à `false` la masque (menu compris).
export const siteConfig = {
  sections: {
    facts: true,
    services: true,
    testimonials: true,
    clients: true,
    blog: true,
  },
  email: "romaricakodjenou54@gmail.com",
  phone: "+229 0166474345",
  phoneHref: "tel:+2290166474345",
  birthDate: "2003-09-09",
  // Noms propres : pas de traduction
  clients: ["SIMAM SARL", "Carréfoot", "Explotel", "Fidevo Group", "ROMAS Technologie", "PayPlus Africa", "Friym"],
} as const;

export function getAge(birthDate: string, now = new Date()): number {
  const birth = new Date(birthDate);
  let age = now.getFullYear() - birth.getFullYear();
  const hadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hadBirthday) age -= 1;
  return age;
}
