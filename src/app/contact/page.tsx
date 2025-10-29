"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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
    <div className="min-h-[100svh]">
      {/* Content */}
      <section className="mx-auto w-10/12 px-4 py-12">
        <div className="mb-8">
          <p className="mt-4 max-w-2xl text-[var(--brand-900)] text-4xl font-accent">
            <span className="italic text-semibold">We’re here to help</span>
            <br />
            <span className="text-lg text-muted-foreground">reach out and our team will get back to you shortly.</span>
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: Info cards */}
          <div className="space-y-4">
            <Card className="border-slate-100! rounded-none! shadow-lg">
              <CardContent className="p-5 flex items-start gap-3">
                <Mail className="text-[var(--primary)] mt-1" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:hello@skykey.com" className="text-base">
                    hello@skykey.com
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-100! rounded-none! shadow-lg">
              <CardContent className="p-5 flex items-start gap-3">
                <Phone className="text-[var(--primary)] mt-1" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+000000000" className="text-base">
                    +0 (000) 000-0000
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-100! rounded-none! shadow-lg">
              <CardContent className="p-5 flex items-start gap-3">
                <MapPin className="text-[var(--primary)] mt-1" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Office</p>
                  <p className="text-base">Madrid, Spain</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-100! rounded-none! shadow-lg">
              <CardContent className="p-5 flex items-start gap-3">
                <Clock className="text-[var(--primary)] mt-1" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Hours</p>
                  <p className="text-base">Mon–Fri, 9:00–18:00 (CET)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Form */}
          <div className="rounded-none border border-slate-800/10 bg-card/70 backdrop-blur p-6 shadow-xl">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" name="phone" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="rounded-md border border-foreground/10 bg-background px-3 py-2"
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1"
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the processing of my data according to the
                  <a className="underline ml-1" href="/privacy" target="_blank">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="px-6"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>
              {status === "success" && (
                <p className="text-green-600 text-sm">
                  Message sent successfully. Thank you for contacting us.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm">
                  Could not send your message: {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
