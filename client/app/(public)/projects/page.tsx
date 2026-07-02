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

export default async function ProjectsPage() {
  const data = await getSiteData();

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
                Projects
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
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.projects.length > 0 ? (
              data.projects.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {item.title || "Project Title"}
                  </h3>

                  <div className="mt-5">
                    <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-amber-50/5 bg-amber-50/5 px-4 py-2 text-sm text-white">
                      <span className="font-medium">
                        {item.demoText || "Demo Link"}
                      </span>

                      <span>:</span>

                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.demoText || "Demo Link"} for ${
                            item.title || "project"
                          }`}
                          className="max-w-[320px] truncate font-medium text-blue-500 underline underline-offset-4 transition hover:text-sky-400"
                        >
                          {item.link}
                        </a>
                      ) : (
                        <span className="text-white/40">No link added</span>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-7 text-white/60">
                    {item.description || "No description added yet."}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-white/45">
                No projects added yet.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}