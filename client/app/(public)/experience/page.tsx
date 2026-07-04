import { getSiteData } from "@/lib/site-data";

export default async function ExperiencePage() {
  const data = await getSiteData();
  const experienceEntries = data.experience ?? [];

  return (
    <section className="rounded-4xl border border-(--profile-border) bg-(--profile-bg) p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-(--profile-muted)">Experience</p>

      <div className="mt-6 grid gap-4">
        {experienceEntries.length > 0 ? (
          experienceEntries.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-(--profile-border) bg-(--profile-surface) p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white">{item.role}</h3>
                  <p className="mt-1 text-white/60">{item.company}</p>
                </div>

                <span className="w-fit rounded-full border border-(--profile-border) bg-(--profile-surface) px-3 py-1 text-xs uppercase tracking-[0.2em] text-(--profile-muted)">
                  {item.duration}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.location && (
                  <span className="rounded-full border border-(--profile-border) bg-(--profile-surface) px-3 py-1 text-xs font-medium text-(--profile-accent)">
                    {item.location}
                  </span>
                )}

                {item.employmentType && (
                  <span className="rounded-full border border-(--profile-border) bg-(--profile-surface) px-3 py-1 text-xs font-medium text-(--profile-accent)">
                    {item.employmentType}
                  </span>
                )}
              </div>

              <p className="mt-4 text-white/55">{item.description}</p>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-(--profile-border) bg-(--profile-surface) p-6 text-(--profile-muted)">
            No experience entries added yet.
          </div>
        )}
      </div>
    </section>
  );
}