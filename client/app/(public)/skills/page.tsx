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

export default async function SkillsPage() {
  const data = await getSiteData();
  const technicalSkills = data.skills.technical ?? [];
  const softSkills = data.skills.soft ?? [];

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
                Skills
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
          <div className="mt-2 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white">
                Technical Skills
              </h3>

              <ul className="mt-6 space-y-4">
                {technicalSkills.length > 0 ? (
                  technicalSkills.map((skill, index) => (
                    <li
                      key={`${skill}-${index}`}
                      className="flex items-start gap-3 text-white/85"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                        ✓
                      </span>
                      <span className="text-base leading-7">{skill}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-white/45">
                    No technical skills added yet.
                  </li>
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white">Soft Skills</h3>

              <ul className="mt-6 space-y-4">
                {softSkills.length > 0 ? (
                  softSkills.map((skill, index) => (
                    <li
                      key={`${skill}-${index}`}
                      className="flex items-start gap-3 text-white/85"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
                        ✓
                      </span>
                      <span className="text-base leading-7">{skill}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-white/45">No soft skills added yet.</li>
                )}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}