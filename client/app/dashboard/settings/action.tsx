"use server";

import {
  getSiteData,
  saveSiteData,
  PublicThemeName,
} from "@/lib/site-data";
import { revalidatePath } from "next/cache";

const validThemes: PublicThemeName[] = [
  "midnight",
  "ocean",
  "emerald",
  "rose",
  "amber",
  "violet",
  "slate",
  "crimson",
  "forest",
  "neon",
];

export async function updateThemeSettings(formData: FormData): Promise<void> {
  const data = await getSiteData();

  const publicTheme = String(formData.get("publicTheme") ?? "").toLowerCase() as PublicThemeName;

  data.settings.publicTheme = validThemes.includes(publicTheme)
    ? publicTheme
    : "midnight";

  await saveSiteData(data);

  revalidatePath("/", "page");
  revalidatePath("/career");
  revalidatePath("/experience");
  revalidatePath("/skills");
  revalidatePath("/projects");
  revalidatePath("/certificates");
  revalidatePath("/dashboard/settings");
}