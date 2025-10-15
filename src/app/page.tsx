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
    <form className="mx-auto max-w-4xl w-full rounded-xl border bg-background/70 p-4 shadow-sm backdrop-blur">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-2">
          <label
            htmlFor="where"
            className="block text-xs text-muted-foreground mb-1"
          >
            Where
          </label>
          <input
            id="where"
            placeholder="City, property or region"
            className="w-full h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="checkin"
            className="block text-xs text-muted-foreground mb-1"
          >
            Check-in
          </label>
          <input
            id="checkin"
            type="date"
            className="w-full h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="checkout"
            className="block text-xs text-muted-foreground mb-1"
          >
            Check-out
          </label>
          <input
            id="checkout"
            type="date"
            className="w-full h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            className="w-full h-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
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
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-background" />
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              Find your next stay
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Search thousands of properties and manage your reservations
              seamlessly.
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
        © {new Date().getFullYear()} Skykey
      </footer>
    </div>
  );
}
