import { getSiteData } from "@/lib/site-data";

export default async function SkillsPage() {
  const data = await getSiteData();
  const technicalSkills = data.skills.technical ?? [];
  const softSkills = data.skills.soft ?? [];

  return (
    <section className="rounded-4xl border border-(--profile-border) bg-(--profile-bg) p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-(--profile-muted)">Skills</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-(--profile-border) bg-(--profile-surface) p-6">
          <h3 className="text-xl font-semibold text-(--profile-fg) ">Technical Skills</h3>

          <ul className="mt-6 space-y-4 ">
            {technicalSkills.length > 0 ? (
              technicalSkills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="flex items-start gap-3 text-white/85"
                >
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    ✓
                  </span>
                  <span className="text-base leading-7 text-(--profile-fg)">
                    {skill}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-white/45">No technical skills added yet.</li>
            )}
          </ul>
        </div>

        <div className="rounded-3xl border border-(--profile-border) bg-(--profile-surface) p-6">
          <h3 className="text-xl font-semibold text-white">Soft Skills</h3>

          <ul className="mt-6 space-y-4">
            {softSkills.length > 0 ? (
              softSkills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="flex items-start gap-3 text-white/85"
                >
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--profile-bg) text-(--profile-accent)">
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
  );
}