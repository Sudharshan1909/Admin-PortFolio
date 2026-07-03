import { getSiteData } from "@/lib/site-data";

export default async function CareerPage() {
  const data = await getSiteData();
  const careerEntries = data.careerEducation ?? [];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/3 p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-white/35">Career</p>

      <div className="mt-6 grid gap-5">
        {careerEntries.length > 0 ? (
          careerEntries.map((item, index) => (
            <article
              key={`${item.institution}-${item.degree}-${index}`}
              className="rounded-3xl border border-white/10 bg-black/20 p-5 sm:p-6"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {item.institution || "Institution Name"}
              </h2>

              <h3 className="mt-3 text-lg font-medium text-white/85 sm:text-xl">
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
  );
}