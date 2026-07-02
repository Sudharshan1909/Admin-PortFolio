import DashboardHeader from "@/components/dashboard-header";
import { getSiteData } from "@/lib/site-data";
import ProjectsEditor from "./projects-editor";

export default async function ProjectsPage() {
  const data = await getSiteData();

  return (
    <>
      <DashboardHeader title="Projects" subtitle="Manage section" />
      <div className="p-8">
        <div className="rounded-4xl border border-white/10 bg-white/3 p-8">
          <ProjectsEditor initialProjects={data.projects ?? []} />
        </div>
      </div>
    </>
  );
}