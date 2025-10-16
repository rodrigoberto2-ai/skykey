"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";

function Topbar() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 h-14 grid grid-cols-3 items-center">
        <nav className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground">
            Home
          </Link>
          <Link href="#about" className="hover:text-foreground">
            About Us
          </Link>
          <Link href="#reservations" className="hover:text-foreground">
            Reservations
          </Link>
          <Link href="#contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="justify-self-center">
          <div className="flex items-center gap-2">
            <Image src="/imgs/logo-skykey.png" alt="" width={40} height={40} />
          </div>
        </div>
        <div className="justify-self-end flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm px-3 py-1.5 rounded-md hover:bg-accent"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

function SearchBar() {
  return (
    <form className="mx-auto max-w-4xl w-full border border-white/25 ring-1 ring-white/20 bg-white/20 backdrop-blur-lg p-4 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-5 text-white items-stretch">
        {/* Coluna 1: Where */}
        <div className="md:col-span-2 grid grid-rows-[1.25rem,1fr] px-2">
          <label htmlFor="where" className="text-xs text-white/80 leading-none self-end">
            Where
          </label>
          <div className="h-16 flex">
            <input
              id="where"
              placeholder="City, property or region"
              className="w-full mx-2 my-3 h-10 border border-white/35 bg-white/10 px-4 text-sm text-white placeholder-white/70 focus:outline-none focus:border-white/50"
            />
          </div>
        </div>

        {/* Coluna 2: Select date (range em um único bloco) */}
        <div className="md:border-l md:border-white/30 md:pl-6 grid grid-rows-[1.25rem,1fr] px-2">
          <label htmlFor="date-range" className="text-xs text-white/80 leading-none self-end">
            Select date
          </label>
          <div className="h-16 flex">
            <input
              id="date-range"
              type="text"
              placeholder="dd/mm — dd/mm"
              className="w-full h-full bg-transparent border-0 px-4 text-sm text-white placeholder-white/80 focus:outline-none"
            />
          </div>
        </div>

        {/* Coluna 3: Guests */}
        <div className="md:border-l md:border-white/30 md:pl-6 grid grid-rows-[1.25rem,1fr] px-2">
          <label htmlFor="guests" className="text-xs text-white/80 leading-none self-end">
            Guests
          </label>
          <div className="h-16 flex">
            <input
              id="guests"
              type="text"
              placeholder="2 guests"
              className="w-full h-full bg-transparent border-0 px-4 text-sm text-white placeholder-white/80 focus:outline-none"
            />
          </div>
        </div>

        {/* Coluna 4/5: Botão ocupando o bloco inteiro */}
        <div className="grid grid-rows-[1.25rem,1fr] px-2">
          <span className="sr-only">Submit</span>
          <div className="h-16">
            <button
              type="button"
              className="w-full h-full bg-[#316ca7] hover:bg-[#1e61a2] text-white transition-colors shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

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
      <Topbar />
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
                  "linear-gradient(180deg, #ae99c8 0%, #948dc4 10%, #8a8cbc 20%, #7c84bc 30%, #5c7cb4 40%, #7183b8 50%, #5474b1 60%, #4571ac 70%, #316ca7 85%, #1e61a2 100%)",
                opacity: 0.82,
              }}
            />
            {/* Overlay 2: leve vinheta superior para reforÃƒÂ§ar contraste no tÃƒÂ­tulo */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent"
            />
          </div>
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20 text-center">
            <img alt="Skykey" src="/logo-skykey.png" className="mx-auto -mt-3 sm:-mt-5 h-auto w-16 sm:w-24 md:w-28 lg:w-[180px]" />
            <p className="mt-3 text-white/90 max-w-2xl mx-auto">
              Find your next stay and feel at home
            </p>
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>
        </section>

        <section id="reservations" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border overflow-hidden">
                <div className="relative h-36 bg-muted">
                  <Image
                    src="/next.svg"
                    alt="placeholder"
                    width={120}
                    height={24}
                    className="absolute inset-0 m-auto opacity-40"
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
        Ã‚Â© {new Date().getFullYear()} Skykey
      </footer>
    </div>
  );
}


