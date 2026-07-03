import { getSiteData } from "@/lib/site-data";

export default async function ProjectsPage() {
  const data = await getSiteData();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/3 p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-white/35">Projects</p>

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
                  <span className="font-medium">{item.demoText || "Demo Link"}</span>
                  <span>:</span>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${item.demoText || "Demo Link"} for ${
                        item.title || "project"
                      }`}
                      className="max-w-[260px] truncate font-medium text-blue-500 underline underline-offset-4 transition hover:text-sky-400 sm:max-w-[320px]"
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
  );
}