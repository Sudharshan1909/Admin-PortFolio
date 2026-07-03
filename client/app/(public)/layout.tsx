import { getSiteData } from "@/lib/site-data";
import PublicNavbar from "@/components/public-navbar";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-zinc-950 px-3 py-4 text-white sm:px-4 sm:py-6">
      <section className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <PublicNavbar name={data.profile.name} />
        {children}
      </section>
    </main>
  );
}