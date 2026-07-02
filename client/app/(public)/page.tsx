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

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-white">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="sticky top-4 z-50 rounded-3xl border border-white/10 bg-zinc-950/85 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                Public Profile
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                {data.profile.name}
              </h1>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
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

              <Link
                href="/login"
                className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </header>

        <div className="grid gap-8 rounded-4xl border border-white/10 bg-white/3 p-6 md:grid-cols-[320px_1fr] md:p-10">
          <div className="flex aspect-4/5 items-center justify-center overflow-hidden rounded-3xl bg-white/10 text-white/50">
            {data.profile.image ? (
              <img
                src={data.profile.image}
                alt={data.profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>No image</span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/45">
              Portfolio
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {data.profile.name}
            </h2>

            <p className="mt-5 text-xl text-white/75">{data.profile.role}</p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              {data.profile.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/45">
              <span>{data.profile.location}</span>
              <span>•</span>
              <a
                href={`mailto:${data.profile.email}`}
                className="transition hover:text-white"
              >
                {data.profile.email}
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {data.profile.contactLinks.map((item) => (
                <a
                  key={`${item.label}-${item.url}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="truncate pl-4 text-white/40">
                    {item.url}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}