import { getSiteData } from "@/lib/site-data";
import PublicNavbar from "@/components/public-navbar";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-zinc-950 px-3 py-4 text-white sm:px-4 sm:py-6">
      <section className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <PublicNavbar name={data.profile.name} />

        <div className="grid gap-6 rounded-4xl border border-white/10 bg-white/3 p-4 sm:p-6 md:gap-8 md:p-10 md:grid-cols-[320px_1fr]">
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

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-6xl">
              {data.profile.name}
            </h2>

            <p className="mt-4 text-lg text-white/75 sm:mt-5 sm:text-xl">
              {data.profile.role}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-base sm:leading-8">
              {data.profile.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/45">
              <span>{data.profile.location}</span>
              <span>•</span>
              <a
                href={`mailto:${data.profile.email}`}
                className="break-all transition hover:text-white"
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
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  <span className="shrink-0">{item.label}</span>
                  <span className="truncate text-right text-white/40">{item.url}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}