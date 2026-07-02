import { getSiteData } from "@/lib/site-data";
import ExperienceForm from "./experience-form";

export default async function ExperiencePage() {
  const data = await getSiteData();

  return <ExperienceForm initialEntries={data.experience ?? []} />;
}