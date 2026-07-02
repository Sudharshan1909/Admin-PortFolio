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

export default async function CertificatesPage() {
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
                Certificates
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
            {data.certificates.length > 0 ? (
              data.certificates.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {item.title || "Certificate Title"}
                  </h3>

                  <p className="mt-2 text-white/60">
                    {item.organization || "Organization Name"}
                  </p>

                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/45">
                    Issue ID: {item.issueId || "N/A"}
                  </p>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-block rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-sky-300 underline underline-offset-4 transition hover:border-white/20 hover:text-sky-200"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <span className="mt-5 inline-block text-sm text-white/35">
                      No link added
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-white/45">
                No certificates added yet.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}