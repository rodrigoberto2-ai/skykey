import Link from "next/link";
import Image from "next/image";

export default function Topbar() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-2 h-fit items-start flex flex-col gap-4">
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
        <div className="w-full">
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground uppercase tracking-wider">
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
        </div>
      </div>
    </header>
  );
}
