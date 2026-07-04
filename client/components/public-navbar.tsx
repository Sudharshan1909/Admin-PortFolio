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
    `rounded-2xl border px-4 py-2 text-sm transition-transform duration-150 ${
      pathname === href
        ? "border-[var(--profile-border)] bg-[var(--profile-panel)] text-[var(--profile-fg)] scale-[1.03]"
        : "border-[var(--profile-border)] text-[var(--profile-muted)] hover:bg-[var(--profile-panel)] hover:text-[var(--profile-fg)] hover:scale-[1.03]"
    }`;

  return (
    <>
      {/* Desktop / top navbar */}
      <header className="sticky top-3 z-50 rounded-3xl border border-(--profile-border) bg-(--profile-surface) px-4 py-4 backdrop-blur md:top-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.35em] text-(--profile-muted) sm:text-xs">
              Public Profile
            </p>
            <h1 className="mt-2 truncate text-xl font-semibold tracking-tight text-(--profile-fg) sm:text-2xl">
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
            <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="rounded-2xl border border-(--profile-border) bg-(--profile-panel) px-5 py-3 text-sm font-medium text-(--profile-fg) transition-transform duration-150 hover:scale-[1.03]"
          >
            Admin Login
          </Link>
        </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--profile-border) bg-(--profile-panel) text-(--profile-fg) transition-transform duration-150 hover:scale-[1.05] lg:hidden"
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

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed right-0 top-0 z-70 flex h-screen w-[86%] max-w-sm flex-col border-l border-(--profile-border) bg-(--profile-bg) p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-(--profile-muted)">
              Navigation
            </p>
            <h2 className="mt-2 text-xl font-semibold text-(--profile-fg)">{name}</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-(--profile-border) bg-(--profile-panel) text-(--profile-fg) transition-transform duration-150 hover:scale-[1.05]"
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
            className="rounded-2xl border border-(--profile-border) bg-(--profile-panel) px-5 py-3 text-sm font-medium text-(--profile-fg) transition-transform duration-150 hover:scale-[1.03]"
          >
            Admin Login
          </Link>
        </div>
      </aside>
    </>
  );
}