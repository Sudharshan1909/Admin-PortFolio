"use client";

import { useState } from "react";
import DashboardForm from "@/components/dashboard-form";
import { updateCertificates } from "../actions";

type CertificateItem = {
  organization: string;
  title: string;
  link: string;
  issueId: string;
};

type CertificatesEditorProps = {
  initialCertificates: CertificateItem[];
};

const emptyCertificate: CertificateItem = {
  organization: "",
  title: "",
  link: "",
  issueId: "",
};

export default function CertificatesEditor({
  initialCertificates,
}: CertificatesEditorProps) {
  const [certificates, setCertificates] = useState<CertificateItem[]>(
    initialCertificates.length ? initialCertificates : [emptyCertificate]
  );

  const updateCertificate = (
    index: number,
    field: keyof CertificateItem,
    value: string
  ) => {
    setCertificates((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addCertificate = () => {
    setCertificates((prev) => [...prev, { ...emptyCertificate }]);
  };

  const removeCertificate = (index: number) => {
    setCertificates((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );
  };

  const cleanedCertificates = certificates.map((item) => ({
    organization: item.organization.trim(),
    title: item.title.trim(),
    link: item.link.trim(),
    issueId: item.issueId.trim(),
  }));

  return (
    <DashboardForm action={updateCertificates}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-(--profile-fg)">
            Certificate Details
          </h2>
          <p className="mt-1 text-sm text-(--profile-muted)">
            Add organization, certificate title, link, and issue ID.
          </p>
        </div>

        <button
          type="button"
          onClick={addCertificate}
          className="rounded-2xl bg-(--profile-accent) px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
        >
          Add +
        </button>
      </div>

      <div className="mt-8 space-y-5">
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className="rounded-3xl border border-(--profile-border) bg-(--profile-panel) p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-medium text-(--profile-fg)">
                Certificate {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeCertificate(index)}
                className="rounded-xl border border-red-400/30 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-(--profile-muted)">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={certificate.organization}
                  onChange={(e) =>
                    updateCertificate(index, "organization", e.target.value)
                  }
                  placeholder="Enter organization name"
                  className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-(--profile-muted)">
                  Certificate Title
                </label>
                <input
                  type="text"
                  value={certificate.title}
                  onChange={(e) =>
                    updateCertificate(index, "title", e.target.value)
                  }
                  placeholder="Enter certificate title"
                  className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-(--profile-muted)">
                  Certificate Link
                </label>
                <input
                  type="url"
                  value={certificate.link}
                  onChange={(e) =>
                    updateCertificate(index, "link", e.target.value)
                  }
                  placeholder="https://example.com/certificate"
                  className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-(--profile-muted)">
                  Certificate Issue ID
                </label>
                <input
                  type="text"
                  value={certificate.issueId}
                  onChange={(e) =>
                    updateCertificate(index, "issueId", e.target.value)
                  }
                  placeholder="Enter issue ID"
                  className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <input
        type="hidden"
        name="certificateRows"
        value={JSON.stringify(cleanedCertificates)}
        readOnly
      />
    </DashboardForm>
  );
}