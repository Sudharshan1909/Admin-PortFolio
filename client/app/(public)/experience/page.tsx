import Link from "next/link";
import { getSiteData } from "@/lib/site-data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/career", label: "Career" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
];

export default async function ExperiencePage() {
  const data = await getSiteData();
  const experienceEntries = data.experience ?? [];

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-white">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-zinc-950/85 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                Public Profile
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                Experience
              </h1>
            </div>

            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <section className="rounded-4xl border border-white/10 bg-white/3 p-8">
          <div className="grid gap-4">
            {experienceEntries.length > 0 ? (
              experienceEntries.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-white/60">{item.company}</p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/55">
                      {item.duration}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.location && (
                      <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
                        {item.location}
                      </span>
                    )}

                    {item.employmentType && (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        {item.employmentType}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-white/55">{item.description}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-white/45">
                No experience entries added yet.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}