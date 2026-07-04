import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

export type LinkItem = {
  label: string;
  url: string;
};

export type ExperienceItem = {
  company: string;
  location: string;
  employmentType: string;
  role: string;
  duration: string;
  description: string;
};

export type ProjectItem = {
  title: string;
  demoText: string;
  link: string;
  description: string;
};

export type CertificateItem = {
  organization: string;
  title: string;
  link: string;
  issueId: string;
};

export type CareerEntry = {
  institution: string;
  degree: string;
  from: string;
  to: string;
  cgpa: string;
};

export type PublicThemeName =
  | "midnight"
  | "ocean"
  | "emerald"
  | "rose"
  | "amber"
  | "violet"
  | "slate"
  | "crimson"
  | "forest"
  | "neon";
export type SiteSettings = {
  publicTheme: PublicThemeName;
};

export type SiteData = {
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    summary: string;
    image: string;
    contactLinks: LinkItem[];
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  careerEducation: CareerEntry[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  settings: SiteSettings;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "site-data.json");

const defaultData: SiteData = {
  profile: {
    name: "Sudharshan K",
    role: "B.E Computer Science and Engineering",
    location: "India",
    email: "you@example.com",
    summary:
      "I build modern web applications with clean UI, reliable backend systems, and strong attention to performance.",
    image: "",
    contactLinks: [
      { label: "GitHub", url: "https://github.com/yourusername" },
      { label: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    ],
  },
  skills: {
    technical: [],
    soft: [],
  },
  careerEducation: [],
  experience: [],
  projects: [],
  certificates: [],
  settings: {
  publicTheme: "midnight",
},
};

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultData, null, 2), "utf8");
  }
}

function normalizeString(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeTheme(value: unknown): PublicThemeName {
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

  const theme = normalizeString(value).toLowerCase() as PublicThemeName;
  return validThemes.includes(theme) ? theme : "midnight";
}


function mergeWithDefaultData(rawData: unknown): SiteData {
  const parsed = (rawData ?? {}) as Partial<SiteData> & {
    skills?: Partial<SiteData["skills"]> | string[];
  };

  const normalizedSkills = Array.isArray(parsed.skills)
    ? {
        technical: parsed.skills.map((item) => normalizeString(item)),
        soft: [],
      }
    : {
        technical: Array.isArray(parsed.skills?.technical)
          ? parsed.skills.technical.map((item) => normalizeString(item))
          : [],
        soft: Array.isArray(parsed.skills?.soft)
          ? parsed.skills.soft.map((item) => normalizeString(item))
          : [],
      };

  return {
    ...defaultData,
    ...parsed,
    profile: {
      ...defaultData.profile,
      ...(parsed.profile ?? {}),
      name: normalizeString(parsed.profile?.name ?? defaultData.profile.name),
      role: normalizeString(parsed.profile?.role ?? defaultData.profile.role),
      location: normalizeString(
        parsed.profile?.location ?? defaultData.profile.location
      ),
      email: normalizeString(parsed.profile?.email ?? defaultData.profile.email),
      summary: normalizeString(
        parsed.profile?.summary ?? defaultData.profile.summary
      ),
      image: normalizeString(parsed.profile?.image ?? defaultData.profile.image),
      contactLinks: Array.isArray(parsed.profile?.contactLinks)
        ? parsed.profile.contactLinks.map((item) => ({
            label: normalizeString(item?.label),
            url: normalizeString(item?.url),
          }))
        : defaultData.profile.contactLinks,
    },
    skills: normalizedSkills,
    careerEducation: Array.isArray(parsed.careerEducation)
      ? parsed.careerEducation.map((item) => ({
          institution: normalizeString(item?.institution),
          degree: normalizeString(item?.degree),
          from: normalizeString(item?.from),
          to: normalizeString(item?.to),
          cgpa: normalizeString(item?.cgpa),
        }))
      : defaultData.careerEducation,
    experience: Array.isArray(parsed.experience)
      ? parsed.experience.map((item) => ({
          company: normalizeString(item?.company),
          location: normalizeString(item?.location),
          employmentType: normalizeString(item?.employmentType),
          role: normalizeString(item?.role),
          duration: normalizeString(item?.duration),
          description: normalizeString(item?.description),
        }))
      : defaultData.experience,
    projects: Array.isArray(parsed.projects)
      ? parsed.projects.map((item) => ({
          title: normalizeString(item?.title),
          demoText: normalizeString(item?.demoText),
          link: normalizeString(item?.link),
          description: normalizeString(item?.description),
        }))
      : defaultData.projects,
    certificates: Array.isArray(parsed.certificates)
      ? parsed.certificates.map((item) => ({
          organization: normalizeString(item?.organization),
          title: normalizeString(item?.title),
          link: normalizeString(item?.link),
          issueId: normalizeString(item?.issueId),
        }))
      : defaultData.certificates,
    settings: {
      publicTheme: normalizeTheme(parsed.settings?.publicTheme),
    },
  };
}

export async function getSiteData(): Promise<SiteData> {
  noStore();
  await ensureDataFile();

  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return mergeWithDefaultData(JSON.parse(raw));
  } catch {
    return defaultData;
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf8");
}