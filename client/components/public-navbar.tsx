"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/career", label: "Career" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
];

type PublicNavbarProps = {
  name: string | null;
};

export default function PublicNavbar({ name }: PublicNavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const linkClass = (href: string) =>
    `rounded-2xl border px-4 py-2 text-sm transition ${
      pathname === href
        ? "border-white/25 bg-white/10 text-white"
        : "border-white/10 text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <>
      <header className="sticky top-3 z-50 rounded-3xl border border-white/10 bg-zinc-950/90 px-4 py-4 backdrop-blur md:top-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/35 sm:text-xs">
              Public Profile
            </p>
            <h1 className="mt-2 truncate text-xl font-semibold tracking-tight sm:text-2xl">
              {name}
            </h1>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/login"
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Admin Login
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-70 flex h-screen w-[86%] max-w-sm flex-col border-l border-white/10 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              Navigation
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">{name}</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="mt-8 grid gap-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
        <Link
            href="/login"
            className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
          Admin Login
        </Link>
        </div>
      </aside>
    </>
  );
}