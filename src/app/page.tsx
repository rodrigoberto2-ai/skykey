"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import Image from "next/image";
import ToursSection from "@/components/ToursSection";

export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    "/imgs/quartos/1.jpg",
    "/imgs/quartos/2.jpg",
    "/imgs/quartos/3.jpg",
    "/imgs/quartos/4.jpg",
    "/imgs/quartos/5.jpg",
  ];

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
      else setChecked(true);
    });
  }, [router]);

  // Avaibook widget loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://bookonline.pro/widgets/search/dist/index.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Reveal-on-scroll animations (no deps)
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    );
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((el) => {
        el.classList.add("reveal-in");
        el.classList.remove("reveal-init");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add("reveal-in");
            el.classList.remove("reveal-init");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Subtle parallax for hero background
  useEffect(() => {
    const n = heroRef.current;
    if (!n) return;
    const onScroll = () => {
      const y = window.scrollY * 0.05;
      n.style.transform = `translateY(${Math.min(30, y)}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-fade slider
  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 7000); // 7s per slide for smoother pacing
    return () => clearInterval(id);
  }, [slides.length]);

  if (!checked) {
    return (
      <div className="min-h-[100svh] grid place-items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] flex flex-col">
      <main className="flex-1">
        {/* Luxury hero with glass search panel */}
        <section className="relative min-h-[88svh] isolate">
          <div
            ref={heroRef}
            className="absolute inset-0 -z-10 will-change-transform overflow-hidden"
          >
            {/* Auto-fading background slideshow */}
            {slides.map((src, idx) => (
              <Image
                key={src}
                src={src}
                alt="Skykey hero slide"
                fill
                priority={idx === 0}
                className={`object-cover object-bottom transition-opacity duration-[2000ms] ease-in-out ${
                  idx === slideIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Overlays for contrast and brand tone */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/12 via-transparent to-transparent" />
            {/* Subtle primary?accent sweep */}
            <div className="absolute inset-0 " />
          </div>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:py-28 lg:py-16">
            <div className="flex flex-col justify-center items-center">
              <div className="text-center">
                <Image
                  src="/logo-skykey.png"
                  alt="Skykey logo"
                  width={260}
                  height={260}
                />
              </div>
            </div>
            {/* Glass widget panel */}
            <div className="mt-16 sm:mt-16 max-w-4xl mx-auto" data-animate>
              <div className="card-glass p-4 sm:p-5 w-full">
                <div
                  className="avaibook-search-widget"
                  data-accommodations-filter="accommodations"
                  data-show-accommodation-units="1"
                  data-target="_self"
                  data-widget-id="95801"
                  data-widget-token="lGJjMLMKFB3NXWgkIUoxfA=="
                  data-background-color="#FFFFFF39"
                  data-main-color="#1e61a2"
                  data-border-radius="12px"
                  data-shadow="0 10px 35px rgb(0 0 0 / 30%)"
                  data-padding="1rem"
                  data-language="es"
                />
              </div>
            </div>
            <div className="w-full reveal-in mt-32 text-center">
              <h1 className="font-accent text-xl sm:text-xl leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
                Feel at home, anywhere
              </h1>
            </div>
          </div>
        </section>

        {/* Tours */}
        <section id="reservations" className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 reveal-init" data-animate>
            <p className="text-[var(--accent)] text-xs tracking-[0.18em] uppercase">
              Tours
            </p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-semibold text-[var(--primary)]">
              The best ways to discover Madrid
            </h2>
          </div>
          <ToursSection />
        </section>
      </main>
      <footer
        id="contact"
        className="border-t py-6 text-center text-sm text-muted-foreground"
      >
        {new Date().getFullYear()} Skykey
      </footer>
    </div>
  );
}
