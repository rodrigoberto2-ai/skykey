"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Sparkles, ShieldCheck, Clock3 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const slides = [
    "/imgs/quartos/1.jpg",
    "/imgs/quartos/2.jpg",
    "/imgs/quartos/3.jpg",
    "/imgs/quartos/4.jpg",
    "/imgs/quartos/5.jpg",
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 7000); // 7s per slide for smoother pacing
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="mx-auto w-10/12 py-16">
      {/* Hero */}
      <div className="absolute inset-0 h-80! -z-10 will-change-transform overflow-hidden w-full">
        {/* Auto-fading background slideshow */}
        {slides.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="Skykey hero slide"
            fill
            priority={idx === 0}
            className={`object-cover object-center transition-opacity duration-[2000ms] ease-in-out ${
              idx === slideIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10335799] via-[#10335799]/35 to-transparent" />
      </div>
      <section className="grid gap-6 lg:grid-cols-2 items-center mt-12 mb-14">
        <div>
          <h1 className="text-4xl sm:text-4xl font-accent italic font-semibold tracking-tight text-white mb-16">
            Feel at home, anywhere
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Skykey crafts apartment-style stays that blend the comfort of home
            with the ease of a great hotel. Born in Madrid, made for modern
            travelers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/stays">
              <Button size="lg" className="px-6 rounded-none text-white">
                Explore Stays
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-6 rounded-none">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-accent italic font-semibold text-[var(--primary)]">
          What we value
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ValueCard icon={<Home className="size-5" />} title="Comfort-first">
            Spacious layouts, quality bedding, and fully equipped kitchens.
          </ValueCard>
          <ValueCard
            icon={<Sparkles className="size-5" />}
            title="Design that welcomes"
          >
            Calming palettes and considered details—beautiful, never fussy.
          </ValueCard>
          <ValueCard
            icon={<ShieldCheck className="size-5" />}
            title="Trust & care"
          >
            Professionally cleaned, well-maintained, and consistently reliable.
          </ValueCard>
          <ValueCard
            icon={<Clock3 className="size-5" />}
            title="Time well-spent"
          >
            Seamless arrivals and quick support so you enjoy the city.
          </ValueCard>
        </div>
      </section>

      {/* Story */}
      <section className="grid gap-8 lg:grid-cols-2 items-start">
        <div className="space-y-4">
          <h3 className="text-xl font-accent italic font-semibold text-[var(--primary)]">
            Our story
          </h3>
          <p className="text-muted-foreground">
            We started in Madrid with a simple idea: create spaces that feel
            like your own place in the city. Not just somewhere to sleep, but a
            comfortable base to work, unwind, and explore.
          </p>
          <p className="text-muted-foreground">
            Today, we’re growing—thoughtfully. Each new apartment follows the
            same philosophy: hospitality, privacy, and ease. We keep the details
            consistent so you know what to expect, while letting every
            neighborhood’s personality shine through.
          </p>
        </div>
        <div className="rounded-none border border-slate-100 shadow-xl p-6 bg-card/40">
          <h4 className="text-base font-accent italic font-medium text-[var(--primary)]">
            Designed for modern travel
          </h4>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Self check-in and flexible arrival times</li>
            <li>Workspace-friendly layouts and fast Wi‑Fi</li>
            <li>Hotel-grade cleaning and linens</li>
            <li>Neighborhood recommendations curated by our team</li>
          </ul>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mt-16 rounded-none border border-slate-200 shadow-lg p-8 bg-gradient-to-r from-[var(--brand-900)]/25 via-accent/25 to-transparent">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-accent italic font-semibold text-[var(--primary)]">
              Ready for your next stay?
            </h3>
            <p className="text-muted-foreground">
              Browse our apartments and book with instant confirmation.
            </p>
          </div>
          <Link href="/stays">
            <Button size="lg" className="px-6 text-white rounded-none">
              View Stays
            </Button>
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
    <div className="rounded-none border border-slate-100 shadow-xl p-5 bg-card/50">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
