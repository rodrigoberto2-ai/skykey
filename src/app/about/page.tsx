import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Sparkles, ShieldCheck, Clock3 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <section className="grid gap-6 lg:grid-cols-2 items-center mb-14">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Feel at home, anywhere
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Skykey crafts apartment-style stays that blend the comfort of home with
            the ease of a great hotel. Born in Madrid, made for modern travelers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/stays">
              <Button size="lg" className="px-6">Explore Stays</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-6">Contact Us</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border">
          <p className="text-base text-muted-foreground">
            We design every detail—layout, light, linens, and local touches—so
            your stay feels effortless. Our approach balances privacy and service,
            giving you space to breathe with support when you want it.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Central locations with character</li>
            <li>Thoughtful amenities for short or long stays</li>
            <li>Reliable check-in and responsive support</li>
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-foreground">What we value</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ValueCard icon={<Home className="size-5" />} title="Comfort-first">
            Spacious layouts, quality bedding, and fully equipped kitchens.
          </ValueCard>
          <ValueCard icon={<Sparkles className="size-5" />} title="Design that welcomes">
            Calming palettes and considered details—beautiful, never fussy.
          </ValueCard>
          <ValueCard icon={<ShieldCheck className="size-5" />} title="Trust & care">
            Professionally cleaned, well-maintained, and consistently reliable.
          </ValueCard>
          <ValueCard icon={<Clock3 className="size-5" />} title="Time well-spent">
            Seamless arrivals and quick support so you enjoy the city.
          </ValueCard>
        </div>
      </section>

      {/* Story */}
      <section className="grid gap-8 lg:grid-cols-2 items-start">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Our story</h3>
          <p className="text-muted-foreground">
            We started in Madrid with a simple idea: create spaces that feel like your
            own place in the city. Not just somewhere to sleep, but a comfortable base
            to work, unwind, and explore.
          </p>
          <p className="text-muted-foreground">
            Today, we’re growing—thoughtfully. Each new apartment follows the same
            philosophy: hospitality, privacy, and ease. We keep the details consistent
            so you know what to expect, while letting every neighborhood’s personality
            shine through.
          </p>
        </div>
        <div className="rounded-xl border p-6 bg-card/50">
          <h4 className="text-base font-medium text-foreground">Designed for modern travel</h4>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Self check-in and flexible arrival times</li>
            <li>Workspace-friendly layouts and fast Wi‑Fi</li>
            <li>Hotel-grade cleaning and linens</li>
            <li>Neighborhood recommendations curated by our team</li>
          </ul>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mt-16 rounded-2xl border p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Ready for your next stay?</h3>
            <p className="text-muted-foreground">Browse our apartments and book with instant confirmation.</p>
          </div>
          <Link href="/stays">
            <Button size="lg" className="px-6">View Stays</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-5 bg-card/50">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
