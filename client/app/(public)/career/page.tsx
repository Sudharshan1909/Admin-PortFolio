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

export default async function CareerPage() {
  const data = await getSiteData();
  const careerEntries = data.careerEducation ?? [];

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
                Career
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
          <div className="grid gap-5">
            {careerEntries.length > 0 ? (
              careerEntries.map((item, index) => (
                <article
                  key={`${item.institution}-${item.degree}-${index}`}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <h2 className="text-3xl font-semibold tracking-tight text-white">
                    {item.institution || "Institution Name"}
                  </h2>
                  <h3 className="mt-3 text-xl font-medium text-white/85">
                    {item.degree || "Degree"}
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45">
                    {item.from || "Start"} — {item.to || "End"}
                  </p>
                  {item.cgpa && (
                    <div className="mt-5">
                      <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/12 px-4 py-1.5 text-sm font-semibold text-emerald-300">
                        {`(CGPA: ${item.cgpa})`}
                      </span>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-white/45">
                No career entries added yet.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}