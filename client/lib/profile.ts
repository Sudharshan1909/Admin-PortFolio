export type Profile = {
  name: string;
  role: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  image?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
};

export async function getProfileData(): Promise<Profile> {
  return {
    name: "Sudharshan K",
    role: "B.E Computer Science and Engineering",
    title: "Full Stack Developer",
    bio: "I build modern web applications with clean UI, reliable backend systems, and strong attention to performance.",
    location: "India",
    email: "you@example.com",
    image: "",
    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
    },
  };
}