'use client'

import { useId, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { CONTACT_LIMITS, validateContact, type ContactField } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error" | "not_configured" | "rate_limited";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactField[]>([]);
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });

  const update = (field: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const invalid = validateContact(values);
    setErrors(invalid);
    if (invalid.length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", message: "", website: "" });
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (body.error === "not_configured") setStatus("not_configured");
      else if (body.error === "rate_limited") setStatus("rate_limited");
      else if (body.fields) {
        setErrors(body.fields);
        setStatus("idle");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    t("mailSubject"),
  )}&body=${encodeURIComponent(values.message)}`;

  const field = (name: ContactField, label: string, input: React.ReactNode) => (
    <div className="field">
      <label htmlFor={`${uid}-${name}`}>{label}</label>
      {input}
      {errors.includes(name) && (
        <span className="err" id={`${uid}-${name}-err`} role="alert">
          {t(`errors.${name}`)}
        </span>
      )}
    </div>
  );

  const common = (name: ContactField) => ({
    id: `${uid}-${name}`,
    name,
    required: true,
    "aria-invalid": errors.includes(name),
    "aria-describedby": errors.includes(name) ? `${uid}-${name}-err` : undefined,
    value: values[name],
    onChange: update(name),
  });

  return (
    <form className="sal-form" onSubmit={submit} noValidate>
      <h4>{t("title")}</h4>

      <div className="row">
        {field("name", t("name"), (
          <input {...common("name")} type="text" autoComplete="name" maxLength={CONTACT_LIMITS.name} />
        ))}
        {field("email", t("email"), (
          <input {...common("email")} type="email" autoComplete="email" maxLength={CONTACT_LIMITS.email} />
        ))}
      </div>
      {field("message", t("message"), (
        <textarea {...common("message")} rows={4} maxLength={CONTACT_LIMITS.message} />
      ))}

      {/* Piège à robots : invisible pour les humains */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
          />
        </label>
      </div>

      <button type="submit" className="sal-btn" disabled={status === "sending"}>
        <span>
          {status === "sending" ? t("sending") : t("send")} <Send size={16} aria-hidden="true" />
        </span>
      </button>

      <p className={`status ${status}`} role="status" aria-live="polite">
        {status === "success" && t("success")}
        {status === "error" && t("error")}
        {status === "rate_limited" && t("rateLimited")}
        {status === "not_configured" && (
          <>
            {t("notConfigured")}{" "}
            <a href={mailto}>{t("writeByMail")}</a>
          </>
        )}
      </p>
    </form>
  );
}
