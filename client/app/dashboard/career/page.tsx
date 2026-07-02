import { getSiteData } from "@/lib/site-data";
import CareerForm from "./career-form";

export default async function CareerPage() {
  const data = await getSiteData();

  return <CareerForm initialEntries={data.careerEducation ?? []} />;
}