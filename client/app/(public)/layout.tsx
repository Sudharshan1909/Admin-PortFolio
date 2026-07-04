import { getSiteData } from "@/lib/site-data";
import PublicNavbar from "@/components/public-navbar";
import PublicThemeShell from "@/components/public-theme-shell";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData();

  return (
    <PublicThemeShell theme={data.settings.publicTheme}>
      <main className="min-h-screen bg-(--profile-bg) px-3 py-4 text-(--profile-fg) sm:px-4 sm:py-6">
        <section className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
          <PublicNavbar name={data.profile.name} />
          {children}
        </section>
      </main>
    </PublicThemeShell>
  );
}