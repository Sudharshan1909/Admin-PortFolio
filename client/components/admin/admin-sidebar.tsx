"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/#hero", label: "Home" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/career", label: "Career" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-white/10 bg-black/30 p-4 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
      <nav className="grid gap-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm transition ${
                active ? "bg-white text-black" : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}