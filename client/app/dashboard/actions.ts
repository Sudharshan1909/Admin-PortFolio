"use server";

import { revalidatePath } from "next/cache";
import {
  getSiteData,
  saveSiteData,
  type CareerEntry,
  type ExperienceItem,
  type LinkItem,
  type ProjectItem,
  type CertificateItem,
  type PublicThemeName,
} from "@/lib/site-data";
import dbConnect from "@/lib/dbConnect";
import Career from "@/models/Career";

export type FormState = {
  success: boolean;
  message: string;
};

function ok(message: string): FormState {
  return { success: true, message };
}

function fail(message: string): FormState {
  return { success: false, message };
}

function getSaveErrorMessage(error: unknown, fallback: string): string {
  console.error(fallback, error);

  if (error instanceof Error) {
    if (error.message.includes("MONGODB_URI")) {
      return "Database is not configured. Add MONGODB_URI in Render environment variables.";
    }

    if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ENOTFOUND") ||
      error.message.includes("querySrv") ||
      error.message.includes("timed out")
    ) {
      return "Database connection failed. Check MongoDB URI and Atlas network access.";
    }
  }

  return fallback;
}

function buildContactLinks(items: LinkItem[]): LinkItem[] {
  return items.filter((item) => item.url.trim() !== "");
}

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

function normalizePublicTheme(value: string): PublicThemeName {
  const theme = value.toLowerCase() as PublicThemeName;
  return validThemes.includes(theme) ? theme : "midnight";
}

async function saveUploadedImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return `data:${file.type || "image/png"};base64,${buffer.toString("base64")}`;
}

export async function updateProfile(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = await getSiteData();

    const role = String(formData.get("role") ?? "");
    const location = String(formData.get("location") ?? "");
    const email = String(formData.get("email") ?? "");
    const summary = String(formData.get("summary") ?? "");
    const existingImage = String(formData.get("existingImage") ?? "");

    const github = String(formData.get("github") ?? "");
    const linkedin = String(formData.get("linkedin") ?? "");
    const twitter = String(formData.get("twitter") ?? "");
    const portfolio = String(formData.get("portfolio") ?? "");

    const imageFile = formData.get("imageFile");
    let image = existingImage;

    if (imageFile instanceof File && imageFile.size > 0) {
      image = await saveUploadedImage(imageFile);
    }

    const contactLinks = buildContactLinks([
      { label: "GitHub", url: github },
      { label: "LinkedIn", url: linkedin },
      { label: "Twitter", url: twitter },
      { label: "Portfolio", url: portfolio },
    ]);

    await saveSiteData({
      ...data,
      profile: {
        ...data.profile,
        role,
        location,
        email,
        summary,
        image,
        contactLinks,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/");

    return ok("Profile updated successfully.");
  } catch (error) {
    return fail(getSaveErrorMessage(error, "Failed to update profile."));
  }
}

export async function updateCareer(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const raw = formData.get("careerEducation");
    let careerEducation: CareerEntry[] = [];

    if (typeof raw === "string" && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          careerEducation = parsed.map((item) => ({
            institution: String(item?.institution ?? ""),
            degree: String(item?.degree ?? ""),
            from: String(item?.from ?? ""),
            to: String(item?.to ?? ""),
            cgpa: String(item?.cgpa ?? ""),
          }));
        }
      } catch {
        careerEducation = [];
      }
    }

    await dbConnect();
    await Career.deleteMany({});
    if (careerEducation.length > 0) {
      await Career.insertMany(careerEducation);
    }

    revalidatePath("/dashboard/career");
    revalidatePath("/career");
    revalidatePath("/");

    return ok("Career updated successfully.");
  } catch (error) {
    return fail(getSaveErrorMessage(error, "Failed to save career details."));
  }
}

export async function updateExperience(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const raw = formData.get("experienceItems");
    let experience: ExperienceItem[] = [];

    if (typeof raw === "string" && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          experience = parsed.map((item) => ({
            company: String(item?.company ?? ""),
            location: String(item?.location ?? ""),
            employmentType: String(item?.employmentType ?? ""),
            role: String(item?.role ?? ""),
            duration: String(item?.duration ?? ""),
            description: String(item?.description ?? ""),
          }));
        }
      } catch {
        experience = [];
      }
    }

    const data = await getSiteData();

    await saveSiteData({
      ...data,
      experience,
    });

    revalidatePath("/dashboard/experience");
    revalidatePath("/");

    return ok("Experience updated successfully.");
  } catch (error) {
    return fail(getSaveErrorMessage(error, "Failed to save experience."));
  }
}

export async function updateSkills(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const technicalRaw = String(formData.get("technical") ?? "");
    const softRaw = String(formData.get("soft") ?? "");

    const technical = technicalRaw
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const soft = softRaw
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const data = await getSiteData();

    await saveSiteData({
      ...data,
      skills: {
        technical,
        soft,
      },
    });

    revalidatePath("/dashboard/skills");
    revalidatePath("/");

    return ok("Skills updated successfully.");
  } catch (error) {
    return fail(getSaveErrorMessage(error, "Failed to save skills."));
  }
}

export async function updateProjects(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const raw = formData.get("projectsData");
    let projects: ProjectItem[] = [];

    if (typeof raw === "string" && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          projects = parsed.map((item) => ({
            title: String(item?.title ?? "").trim(),
            demoText: String(item?.demoText ?? item?.stack ?? "Live Demo").trim(),
            link: String(item?.link ?? "").trim(),
            description: String(item?.description ?? "").trim(),
          }));
        }
      } catch {
        projects = [];
      }
    }

    const data = await getSiteData();

    await saveSiteData({
      ...data,
      projects,
    });

    revalidatePath("/dashboard/projects");
    revalidatePath("/");

    return ok("Projects updated successfully.");
  } catch (error) {
    return fail(getSaveErrorMessage(error, "Failed to save projects."));
  }
}

export async function updateCertificates(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const raw = formData.get("certificateRows");
    let certificates: CertificateItem[] = [];

    if (typeof raw === "string" && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          certificates = parsed.map((item) => ({
            organization: String(item?.organization ?? "").trim(),
            title: String(item?.title ?? "").trim(),
            link: String(item?.link ?? "").trim(),
            issueId: String(item?.issueId ?? "").trim(),
          }));
        }
      } catch {
        certificates = [];
      }
    }

    const data = await getSiteData();

    await saveSiteData({
      ...data,
      certificates,
    });

    revalidatePath("/dashboard/certificate");
    revalidatePath("/");

    return ok("Certificates updated successfully.");
  } catch (error) {
    return fail(getSaveErrorMessage(error, "Failed to save certificates."));
  }
}

export async function updateThemeSettings(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const data = await getSiteData();
    const publicTheme = normalizePublicTheme(String(formData.get("publicTheme") ?? ""));

    await saveSiteData({
      ...data,
      settings: {
        ...data.settings,
        publicTheme,
      },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/");

    return { success: true, message: "Theme updated successfully." };
  } catch (error) {
    return { success: false, message: getSaveErrorMessage(error, "Failed to save theme.") };
  }
}
