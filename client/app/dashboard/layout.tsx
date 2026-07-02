import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="flex min-h-screen flex-col border-r border-white/10 bg-black/20">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          <nav className="flex-1 space-y-2 px-4">
            <Link
              href="/dashboard/home"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/dashboard/career"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Career
            </Link>

            <Link
              href="/dashboard/projects"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Projects
            </Link>

            <Link
              href="/dashboard/experience"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Experience
            </Link>

            <Link
              href="/dashboard/skills"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Skills
            </Link>

            <Link
              href="/dashboard/certificates"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Certificates
            </Link>
          </nav>

          <div className="mt-auto p-4">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="w-full rounded-2xl border border-white/15 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/10"
              >
                Logout
              </button>
            </form>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}