import { getSiteData } from "@/lib/site-data";

export default async function CertificatesPage() {
  const data = await getSiteData();

  return (
    <section className="rounded-4xl border border-(--profile-border) bg-(--profile-bg) p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-(--profile-muted)">
        Certificates
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {data.certificates.length > 0 ? (
          data.certificates.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-(--profile-border) bg-(--profile-surface) p-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {item.title || "Certificate Title"}
              </h3>

              <p className="mt-2 text-lg text-(--profile-accent)">
                {item.organization || "Organization Name"}
              </p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-(--profile-muted)">
                Issue ID: {item.issueId || "N/A"}
              </p>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-2xl border border-(--profile-border) bg-(--profile-surface) px-4 py-2 text-sm font-medium text-(--profile-accent) underline underline-offset-4 transition hover:border-(--profile-border) hover:text-(--profile-accent)"
                >
                  View Certificate
                </a>
              ) : (
                <span className="mt-5 inline-block text-sm text-(--profile-muted)">
                  No link added
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-(--profile-border) bg-(--profile-surface) p-6 text-(--profile-muted)">
            No certificates added yet.
          </div>
        )}
      </div>
    </section>
  );
}