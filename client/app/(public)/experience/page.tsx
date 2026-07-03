import { getSiteData } from "@/lib/site-data";

export default async function ExperiencePage() {
  const data = await getSiteData();
  const experienceEntries = data.experience ?? [];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/3 p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-white/35">Experience</p>

      <div className="mt-6 grid gap-4">
        {experienceEntries.length > 0 ? (
          experienceEntries.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-medium text-white">{item.role}</h3>
                  <p className="mt-1 text-white/60">{item.company}</p>
                </div>

                <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/55">
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
  );
}