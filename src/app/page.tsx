"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
      else setChecked(true);
    });
  }, [router]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://bookonline.pro/widgets/search/dist/index.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Remove o script ao desmontar o componente (opcional)
      document.body.removeChild(script);
    };
  }, []);

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
        {/* Hero com imagem de fundo e overlay com gradiente de sua paleta */}
        <section className="relative">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/hero.jpg"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay 1: gradiente de paleta (mais intenso) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #ae99c8 0%, #948dc4 10%, #8a8cbc 20%, #7c84bc 30%, #5c7cb4 40%, #7183b8 50%, #5474b1 60%, #4571ac 70%, #316ca7 85%, #1e61a2 100%)",
                opacity: 0.725,
              }}
            />
            {/* Overlay 2: leve vinheta superior para reforÃƒÂ§ar contraste no tÃƒÂ­tulo */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
          </div>
          <div className="mx-auto max-w-6xl px-4 h-[600px] sm:py-20 text-center gap-8">
            <h3 className="font-accent mb-8 text-7xl text-white text-center">
              Feeling at home
              <br /> anywhere
            </h3>
            <div className="mx-auto max-w-4xl mt-24 w-full backdrop-blur-xs min-h-fit shadow-xl">
              <div
                className="avaibook-search-widget"
                data-accommodations-filter="accommodations"
                data-show-accommodation-units="1"
                data-target="_self"
                data-widget-id="95801"
                data-widget-token="lGJjMLMKFB3NXWgkIUoxfA=="
                data-background-color="#FFFFFF39"
                data-main-color="#1e61a2"
                data-border-radius="3px"
                data-shadow="0 2px 20px rgb(0 0 0 / 16%)"
                data-padding="1rem"
                data-language="es"
              />
            </div>
          </div>
        </section>

        <section id="reservations" className="mx-auto max-w-6xl px-4 py-12">
          <h3 className="font-accent text-primary text-4xl mb-8">
            The best tours tours
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border overflow-hidden">
                <div className="relative h-48 bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                    alt="placeholder"
                    fill
                    className="inset-0 m-auto opacity-80"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">Featured property {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Great location and amenities.
                  </p>
                </div>
              </div>
            ))}
          </div>
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
