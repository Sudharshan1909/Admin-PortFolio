import DashboardHeader from "@/components/dashboard-header";
import DashboardForm from "@/components/dashboard-form";
import { updateProfile } from "../actions";
import { getSiteData } from "@/lib/site-data";
function getContactValue(
  links: { label: string; url: string }[],
  label: string
) {
  return (
    links.find((item) => item.label.toLowerCase() === label.toLowerCase())
      ?.url ?? ""
  );
}

export default async function DashboardHomeDetailsPage() {
  const data = await getSiteData();

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        
          <DashboardForm action={updateProfile}>
            <div className="grid gap-8">
              <div className="grid gap-6 md:grid-cols-[220px_1fr]">

                <div className="space-y-4">
                  <DashboardHeader title={data.profile.name} subtitle="Welcome" />
                  {data.profile.image ? (
                    <img
                      src={data.profile.image}
                      alt={data.profile.name}
                      className="h-40 w-32 rounded-2xl border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="flex h-40 w-32 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm text-white/40">
                      No image
                    </div>
                  )}

                  <input
                    type="hidden"
                    name="existingImage"
                    defaultValue={data.profile.image}
                  />

                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    className="block w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/65">
                    Role
                  </label>
                  <input
                    name="role"
                    defaultValue={data.profile.role}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/65">
                    Location
                  </label>
                  <input
                    name="location"
                    defaultValue={data.profile.location}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-white/65">
                    Email
                  </label>
                  <input
                    name="email"
                    defaultValue={data.profile.email}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-white/65">
                    Profile Summary
                  </label>
                  <textarea
                    name="summary"
                    rows={5}
                    defaultValue={data.profile.summary}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-white/35">
                  Contact Links
                </p>

                <div className="mt-6 space-y-4">
                  <div className="grid items-center gap-4 md:grid-cols-[180px_1fr]">
                    <div className="text-sm text-white/55">GitHub</div>
                    <input
                      name="github"
                      defaultValue={getContactValue(
                        data.profile.contactLinks,
                        "GitHub"
                      )}
                      placeholder="https://github.com/username"
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div className="grid items-center gap-4 md:grid-cols-[180px_1fr]">
                    <div className="text-sm text-white/55">LinkedIn</div>
                    <input
                      name="linkedin"
                      defaultValue={getContactValue(
                        data.profile.contactLinks,
                        "LinkedIn"
                      )}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div className="grid items-center gap-4 md:grid-cols-[180px_1fr]">
                    <div className="text-sm text-white/55">Twitter</div>
                    <input
                      name="twitter"
                      defaultValue={getContactValue(
                        data.profile.contactLinks,
                        "Twitter"
                      )}
                      placeholder="https://twitter.com/username"
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div className="grid items-center gap-4 md:grid-cols-[180px_1fr]">
                    <div className="text-sm text-white/55">Portfolio</div>
                    <input
                      name="portfolio"
                      defaultValue={getContactValue(
                        data.profile.contactLinks,
                        "Portfolio"
                      )}
                      placeholder="https://your-site.com"
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DashboardForm>
        
      </div>
    </>
  );
}