// "use server";

// import {
//   getSiteData,
//   saveSiteData,
//   PublicThemeName,
//   ScreenMode,
// } from "@/lib/site-data";
// import { revalidatePath } from "next/cache";

// const validThemes: PublicThemeName[] = [
//   "midnight",
//   "ocean",
//   "emerald",
//   "rose",
//   "amber",
//   "violet",
//   "slate",
//   "crimson",
//   "forest",
//   "neon",
// ];

// const validModes: ScreenMode[] = ["dark", "light"];

// export async function updateThemeSettings(formData: FormData): Promise<void> {
//   const data = await getSiteData();

//   const publicTheme = String(formData.get("publicTheme") ?? "").toLowerCase() as PublicThemeName;
//   const screenMode = String(formData.get("screenMode") ?? "").toLowerCase() as ScreenMode;

//   data.settings = {
//     publicTheme: validThemes.includes(publicTheme) ? publicTheme : "midnight",
//     screenMode: validModes.includes(screenMode) ? screenMode : "dark",
//   };

//   await saveSiteData(data);

//   revalidatePath("/", "layout");
//   revalidatePath("/career");
//   revalidatePath("/experience");
//   revalidatePath("/skills");
//   revalidatePath("/projects");
//   revalidatePath("/certificates");
//   revalidatePath("/dashboard/settings");
// }