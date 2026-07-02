"use server";

import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import {
  getSiteData,
  saveSiteData,
  type CareerEntry,
  type ExperienceItem,
  type LinkItem,
  type ProjectItem,
  type CertificateItem,
} from "@/lib/site-data";

function buildContactLinks(items: LinkItem[]): LinkItem[] {
  return items.filter((item) => item.url.trim() !== "");
}

async function saveUploadedImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const ext =
    file.name.split(".").pop()?.toLowerCase() ||
    file.type.split("/").pop()?.toLowerCase() ||
    "png";

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}

export async function updateProfile(formData: FormData) {
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
}

export async function updateCareer(formData: FormData) {
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

  const data = await getSiteData();

  await saveSiteData({
    ...data,
    careerEducation,
  });

  revalidatePath("/dashboard/career");
  revalidatePath("/");
}

export async function updateExperience(formData: FormData) {
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
}

export async function updateSkills(formData: FormData) {
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
}

export async function updateProjects(formData: FormData) {
  const raw = formData.get("projectsData");

  let projects: ProjectItem[] = [];

  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        projects = parsed.map((item) => ({
          title: String(item?.title ?? "").trim(),
          demoText: String(item?.stack ?? "").trim(),
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
}

export async function updateCertificates(formData: FormData) {
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
}