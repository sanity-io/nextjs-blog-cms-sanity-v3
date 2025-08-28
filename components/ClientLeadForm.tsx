// components/ClientLeadForm.tsx
"use client";
import { useState } from "react";

type Props = {
  city: string | undefined;
  service: string | undefined;
};

export default function ClientLeadForm({ city, service }: Props) {
  const [status, setStatus] =
    useState<"idle" | "ok" | "error" | "submitting">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          city: form.get("city"),
          service: form.get("service"),
          company: form.get("company"), // honeypot
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 560 }}>
      {/* honeypot */}
      <input
        type="text"
        name="company"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div style={{ display: "grid", gap: 10 }}>
        <input name="name" placeholder="Your name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          name="city"
          placeholder="City"
          defaultValue={city ?? ""}
          required
        />
        <input
          name="service"
          placeholder="Service"
          defaultValue={service ?? ""}
          required
        />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Get free quotes"}
        </button>
      </div>

      {status === "ok" && (
        <p style={{ color: "green", marginTop: 8 }}>
          Thanks! We’ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p style={{ color: "crimson", marginTop: 8 }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
