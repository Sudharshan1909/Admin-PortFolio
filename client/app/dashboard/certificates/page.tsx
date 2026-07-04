import DashboardHeader from "@/components/dashboard-header";
import { getSiteData } from "@/lib/site-data";
import CertificatesEditor from "./certificates-editor";

export default async function CertificatesPage() {
  const data = await getSiteData();

  return (
    <>
      <DashboardHeader title="Certificates" subtitle="Manage section" />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="rounded-4xl border border-(--profile-border) bg-(--profile-surface) p-4 sm:p-6 lg:p-8">
          <CertificatesEditor initialCertificates={data.certificates ?? []} />
        </div>
      </div>
    </>
  );
}