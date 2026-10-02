import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContact, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";

// Limite simple en mémoire (par instance) : 5 messages / 10 min / adresse IP
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  let data: Partial<ContactPayload>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }

  // Robots : on répond « succès » sans rien envoyer
  if (data.website) return json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) return json({ error: "rate_limited" }, 429);

  const fields = validateContact(data);
  if (fields.length) return json({ error: "invalid", fields }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: "not_configured" }, 503);

  const name = data.name!.trim();
  const email = data.email!.trim();
  const message = data.message!.trim();

  const response = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || siteConfig.email],
      reply_to: email,
      subject: `Message depuis le portfolio – ${name.replace(/[\r\n]+/g, " ")}`,
      // Texte brut uniquement : aucun HTML venant du visiteur n'est interprété
      text: `De : ${name} <${email}>\n\n${message}`,
    }),
  }).catch(() => null);

  if (!response?.ok) return json({ error: "send_failed" }, 502);
  return json({ ok: true });
}
