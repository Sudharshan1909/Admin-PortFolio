import DashboardNavbar from "@/components/dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-(--profile-bg) px-4 py-6 text-(--profile-fg)">
      <section className="mx-auto max-w-6xl space-y-6">
        <DashboardNavbar />
        {children}
      </section>
    </main>
  );
}