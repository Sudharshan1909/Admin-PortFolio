import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

import dbConnect from "@/lib/dbConnect";
import Profile from "@/models/Home";
import Career from "@/models/Career";
import Certificate from "@/models/Certificate";
import Experience from "@/models/Experience";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Settings from "@/models/Settings";

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

function getCareerEntryKey(item: CareerEntry): string {
  return [
    item.institution,
    item.degree,
    item.from,
    item.to,
    item.cgpa,
  ]
    .map((value) => normalizeString(value).toLowerCase())
    .join("|");
}

function uniqueCareerEntries(entries: CareerEntry[]): CareerEntry[] {
  const seen = new Set<string>();
  const unique: CareerEntry[] = [];

  for (const entry of entries) {
    const key = getCareerEntryKey(entry);
    if (seen.has(key)) continue;

    seen.add(key);
    unique.push(entry);
  }

  return unique;
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

async function readFileSiteData(): Promise<SiteData> {
  try {
    const file = await fs.readFile(dataFile, "utf8");
    return mergeWithDefaultData(JSON.parse(file));
  } catch (error) {
    console.error("Error reading fallback site data:", error);
    return defaultData;
  }
}

export async function getSiteData(): Promise<SiteData> {
  noStore();
  try {
    await dbConnect();
    const profileDoc = (await Profile.findOne().lean()) as any;
    const careerDocs = (await Career.find().sort({ createdAt: -1 }).lean()) as any[];
    const certificateDocs = (await Certificate.find().lean()) as any[];
    const experienceDocs = (await Experience.find().lean()) as any[];
    const projectDocs = (await Project.find().lean()) as any[];
    const skillDocs = (await Skill.find().lean()) as any[];
    const settingsDoc = (await Settings.findOne().lean()) as any;

    const profile = {
      name: normalizeString(profileDoc?.name ?? defaultData.profile.name),
      role: normalizeString(profileDoc?.role ?? defaultData.profile.role),
      location: normalizeString(profileDoc?.location ?? defaultData.profile.location),
      email: normalizeString(profileDoc?.email ?? defaultData.profile.email),
      summary: normalizeString(profileDoc?.summary ?? defaultData.profile.summary),
      image: normalizeString(profileDoc?.image ?? defaultData.profile.image),
      contactLinks: Array.isArray(profileDoc?.contactLinks)
        ? profileDoc.contactLinks.map((item: any) => ({
            label: normalizeString(item?.label),
            url: normalizeString(item?.url),
          }))
        : defaultData.profile.contactLinks,
    };

    const legacyCareerEntries = Array.isArray(careerDocs?.[0]?.careerEducation)
      ? careerDocs[0].careerEducation
      : [];

    const careerEducation = uniqueCareerEntries(
      Array.isArray(careerDocs) && careerDocs.length > 0
        ? careerDocs.flatMap((doc: any) => {
          if (Array.isArray(doc?.careerEducation)) {
            return doc.careerEducation.map((item: any) => ({
              institution: normalizeString(item?.institution),
              degree: normalizeString(item?.degree),
              from: normalizeString(item?.from),
              to: normalizeString(item?.to),
              cgpa: normalizeString(item?.cgpa),
            }));
          }

          return {
            institution: normalizeString(doc?.institution),
            degree: normalizeString(doc?.degree),
            from: normalizeString(doc?.from),
            to: normalizeString(doc?.to),
            cgpa: normalizeString(doc?.cgpa),
          };
        })
        : legacyCareerEntries.map((item: any) => ({
          institution: normalizeString(item?.institution),
          degree: normalizeString(item?.degree),
          from: normalizeString(item?.from),
          to: normalizeString(item?.to),
          cgpa: normalizeString(item?.cgpa),
        }))
    );

    const experience = Array.isArray(experienceDocs)
      ? experienceDocs.map((item: any) => ({
          company: normalizeString(item?.company),
          location: normalizeString(item?.location),
          employmentType: normalizeString(item?.employmentType),
          role: normalizeString(item?.role),
          duration: normalizeString(item?.duration),
          description: normalizeString(item?.description),
        }))
      : defaultData.experience;

    const projects = Array.isArray(projectDocs)
      ? projectDocs.map((item: any) => ({
          title: normalizeString(item?.title),
          demoText: normalizeString(item?.demoText),
          link: normalizeString(item?.link),
          description: normalizeString(item?.description),
        }))
      : defaultData.projects;

    const certificates = Array.isArray(certificateDocs)
      ? certificateDocs.map((item: any) => ({
          organization: normalizeString(item?.organization),
          title: normalizeString(item?.title),
          link: normalizeString(item?.link),
          issueId: normalizeString(item?.issueId),
        }))
      : defaultData.certificates;

    const technical = Array.isArray(skillDocs)
      ? skillDocs.filter((d: any) => d.category === "technical").map((d: any) => normalizeString(d.name))
      : [];
    const soft = Array.isArray(skillDocs)
      ? skillDocs.filter((d: any) => d.category === "soft").map((d: any) => normalizeString(d.name))
      : [];
    const skills = { technical, soft };

    const settings = {
      publicTheme: normalizeTheme(settingsDoc?.publicTheme ?? defaultData.settings.publicTheme),
    };

    return {
      profile,
      skills,
      careerEducation,
      experience,
      projects,
      certificates,
      settings,
    };
  } catch (error) {
    console.error("Error in getSiteData:", error);
    return readFileSiteData();
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  try {
    await dbConnect();

    // 1. Profile (upsert single document)
    await Profile.findOneAndUpdate(
      {},
      {
        name: data.profile.name,
        role: data.profile.role,
        location: data.profile.location,
        email: data.profile.email,
        summary: data.profile.summary,
        image: data.profile.image,
        contactLinks: data.profile.contactLinks,
      },
      { upsert: true, new: true }
    );

    // 2. Career (delete all and re-create as one document per entry)
    await Career.deleteMany({});
    if (data.careerEducation && data.careerEducation.length > 0) {
      await Career.insertMany(data.careerEducation);
    }

    // 3. Certificates (delete all and re-create)
    await Certificate.deleteMany({});
    if (data.certificates && data.certificates.length > 0) {
      await Certificate.insertMany(data.certificates);
    }

    // 4. Experience (delete all and re-create)
    await Experience.deleteMany({});
    if (data.experience && data.experience.length > 0) {
      await Experience.insertMany(data.experience);
    }

    // 5. Projects (delete all and re-create)
    await Project.deleteMany({});
    if (data.projects && data.projects.length > 0) {
      await Project.insertMany(data.projects);
    }

    // 6. Skills (delete all and re-create)
    await Skill.deleteMany({});
    const skillDocs: any[] = [];
    data.skills.technical.forEach(name => {
      skillDocs.push({ name, category: "technical" });
    });
    data.skills.soft.forEach(name => {
      skillDocs.push({ name, category: "soft" });
    });
    if (skillDocs.length > 0) {
      await Skill.insertMany(skillDocs);
    }

    // 7. Settings (upsert single document)
    await Settings.findOneAndUpdate(
      {},
      { publicTheme: data.settings.publicTheme },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error("Error in saveSiteData:", error);
    throw error;
  }
}
