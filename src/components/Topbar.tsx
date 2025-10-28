"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  const base = "h-full text-white transition-all font-normal hover:opacity-80 hover:border-b-4 hover:border-b-white/20";
  const active = isActive ? "border-b-4 border-b-white/20 text-white" : "";
  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={`${base} ${active}`}>
      {children}
    </Link>
  );
}

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
              className="text-sm px-3 py-1.5 border border-white/60 w-28 text-center font-bold text-white"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="text-sm px-3 py-1.5 bg-white/10 w-28 text-center font-bold text-white"
            >
              Sign In
            </Link>
          </div>
        </div>

        <nav className="mt-1 hidden sm:flex items-center gap-8 text-sm text-white uppercase tracking-widest h-full pt-2">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/stays">Stays</NavItem>
          <NavItem href="/about">About Us</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </nav>
      </div>
    </header>
  );
}
