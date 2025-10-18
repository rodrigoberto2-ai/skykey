"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Solicitud fallida");
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Ocurrió un error");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-sans text-3xl mb-4 text-primary">Contact</h1>
      <p className="text-muted-foreground max-w-2xl mb-8">
        Have questions or need support? Send us a message and we’ll get back to you as soon as possible.
      </p>

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input id="name" name="name" required className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone (optional)</label>
          <input id="phone" name="phone" className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="subject" className="text-sm font-medium">Subject</label>
          <input id="subject" name="subject" required className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" name="message" required rows={6} className="border rounded-md px-3 py-2" />
        </div>

        <div className="flex items-start gap-2">
          <input id="consent" name="consent" type="checkbox" required className="mt-1" />
          <label htmlFor="consent" className="text-sm text-muted-foreground">
            I agree to the processing of my data according to the <a className="underline" href="/privacy" target="_blank">Privacy Policy</a>.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-sm">Message sent successfully. Thank you for contacting us.</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm">Could not send your message: {error}</p>
        )}
      </form>

      <div className="mt-10 text-sm text-muted-foreground">
        You can also email <a href="mailto:hello@skykey.com" className="underline">hello@skykey.com</a> or call <a href="tel:+000000000" className="underline">+0 (000) 000-0000</a>.
      </div>
    </div>
  );
}
