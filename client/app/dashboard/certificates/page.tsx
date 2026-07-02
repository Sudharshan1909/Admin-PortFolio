import DashboardHeader from "@/components/dashboard-header";
import DashboardForm from "@/components/dashboard-form";
import { updateCertificates } from "../actions";
import { getSiteData } from "@/lib/site-data";
import CertificatesEditor from "./certificates-editor";

export default async function CertificatesPage() {
  const data = await getSiteData();

  return (
    <>
      <DashboardHeader title="Certificates" subtitle="Manage section" />
      <div className="p-8">
        <div className="rounded-4xl border border-white/10 bg-white/3 p-8">
          <CertificatesEditor initialCertificates={data.certificates ?? []} />
        </div>
      </div>
    </>
  );
}