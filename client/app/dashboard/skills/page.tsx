import DashboardHeader from "@/components/dashboard-header";
import SkillsEditor from "@/components/skills-editor";
import { getSiteData } from "@/lib/site-data";

export default async function SkillsPage() {
  const data = await getSiteData();

  const technical: string[] = Array.isArray(data?.skills?.technical)
    ? data.skills.technical
    : Array.isArray(data?.skills)
    ? data.skills
    : [];

  const soft: string[] = Array.isArray(data?.skills?.soft)
    ? data.skills.soft
    : [];

  return (
    <>
      <DashboardHeader title="Skills" subtitle="Manage section" />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-4xl border border-(--profile-border) bg-(--profile-surface) p-4 sm:p-6 lg:p-8">
          <SkillsEditor
            initialTechnical={technical}
            initialSoft={soft}
          />
        </div>
      </div>
    </>
  );
}