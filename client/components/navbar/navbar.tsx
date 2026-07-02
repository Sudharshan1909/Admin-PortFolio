"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "@/components/auth/auth-button";

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/career", label: "Career" },
  { href: "/certificates", label: "Certificates" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <nav className="flex flex-wrap gap-2">
          {links.map((link) => {
            const active =
              link.href === "/#hero"
                ? pathname === "/"
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <AuthButton />
      </div>
    </header>
  );
}