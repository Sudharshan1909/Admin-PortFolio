import { getSiteData } from "@/lib/site-data";

export default async function CertificatesPage() {
  const data = await getSiteData();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/3 p-4 sm:p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.35em] text-white/35">
        Certificates
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {data.certificates.length > 0 ? (
          data.certificates.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-black/20 p-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-white">
                {item.title || "Certificate Title"}
              </h3>

              <p className="mt-2 text-white/60">
                {item.organization || "Organization Name"}
              </p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/45">
                Issue ID: {item.issueId || "N/A"}
              </p>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-sky-300 underline underline-offset-4 transition hover:border-white/20 hover:text-sky-200"
                >
                  View Certificate
                </a>
              ) : (
                <span className="mt-5 inline-block text-sm text-white/35">
                  No link added
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-6 text-white/45">
            No certificates added yet.
          </div>
        )}
      </div>
    </section>
  );
}