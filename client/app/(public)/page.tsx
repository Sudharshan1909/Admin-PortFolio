import { getSiteData } from "@/lib/site-data";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <div className="grid gap-6 rounded-4xl border border-(--profile-border) bg-(--profile-surface) p-4 sm:p-6 md:grid-cols-[320px_1fr] md:gap-8 md:p-10">
      {/* Left: image / avatar panel */}
      <div className="flex aspect-4/5 items-center justify-center overflow-hidden rounded-3xl bg-(--profile-panel) text-(--profile-muted)">
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

      {/* Right: main content */}
      <div className="flex flex-col justify-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-(--profile-muted)">
          Portfolio
        </p>

        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-(--profile-fg) sm:text-4xl md:text-6xl">
          {data.profile.name}
        </h2>

        <p className="mt-4 text-lg text-(--profile-accent) sm:mt-5 sm:text-xl">
          {data.profile.role}
        </p>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-(--profile-muted) sm:mt-6 sm:text-base sm:leading-8">
          {data.profile.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-(--profile-muted)">
          <span>{data.profile.location}</span>
          <span>•</span>
          <a
            href={`mailto:${data.profile.email}`}
            className="break-all text-(--profile-fg) transition hover:opacity-80"
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
              className="flex items-center justify-between gap-3 rounded-2xl border border-(--profile-border) bg-(--profile-panel) px-4 py-3 text-sm text-(--profile-fg) transition hover:opacity-90"
            >
              <span className="shrink-0">{item.label}</span>
              <span className="truncate text-right text-(--profile-muted)">
                {item.url}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}