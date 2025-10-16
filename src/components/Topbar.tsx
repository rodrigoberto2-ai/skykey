import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 pt-2 h-36 items-start flex flex-col justify-center gap-4">
        <div className="flex justify-between w-full">
          <div className="justify-self-center">
            <div className="flex items-center gap-2">
              <Image
                src="/imgs/logo-skykey.png"
                alt=""
                width={72}
                height={72}
              />
            </div>
          </div>
          <div className="justify-self-end flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm px-3 py-1.5 border border-[var(--primary)] w-28 text-center font-bold text-[var(--primary)]"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="text-sm px-3 py-1.5 bg-[var(--primary)] w-28 text-center font-bold text-white"
            >
              Sign In
            </Link>
          </div>
        </div>

        <nav className="mt-1 hidden sm:flex items-center gap-8 text-sm text-muted-foreground uppercase tracking-widest h-full pt-2">
          <Link
            href="#"
            className="h-full text-[var(--primary)] transition-all font-normal hover:text-foreground hover:border-b-4 hover:border-b-[var(--primary)]"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="h-full text-[var(--primary)] transition-all font-normal hover:text-foreground hover:border-b-4 hover:border-b-[var(--primary)]"
          >
            About Us
          </Link>
          <Link
            href="#reservations"
            className="h-full text-[var(--primary)] transition-all font-normal hover:text-foreground hover:border-b-4 hover:border-b-[var(--primary)]"
          >
            Reservations
          </Link>
          <Link
            href="#contact"
            className="h-full text-[var(--primary)] transition-all font-normal hover:text-foreground hover:border-b-4 hover:border-b-[var(--primary)]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
