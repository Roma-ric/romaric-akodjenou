// Règles de validation partagées entre le formulaire (client) et la route d'envoi (serveur)
export const CONTACT_LIMITS = { name: 100, email: 254, message: 4000, minMessage: 10 } as const;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Piège à robots : doit rester vide */
  website?: string;
};

export type ContactField = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactPayload>): ContactField[] {
  const errors: ContactField[] = [];
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name || name.length > CONTACT_LIMITS.name) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email) errors.push("email");
  if (message.length < CONTACT_LIMITS.minMessage || message.length > CONTACT_LIMITS.message) {
    errors.push("message");
  }
  return errors;
}
