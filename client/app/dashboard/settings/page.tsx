import { getSiteData } from "@/lib/site-data";
import { updateThemeSettings } from "./action";

const themes = [
  "midnight",
  "ocean",
  "emerald",
  "rose",
  "amber",
  "violet",
  "slate",
  "crimson",
  "forest",
  "neon",
] as const;

export default async function SettingsPage() {
  const data = await getSiteData();

  return (
    <main className="min-h-screen bg-(--profile-bg) px-4 py-6 text-(--profile-fg)">
      <section className="mx-auto max-w-6xl space-y-8">
        <form
          action={updateThemeSettings}
          className="space-y-8 rounded-3xl border border-(--profile-border) bg-(--profile-surface) p-6"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
            Public Profile Settings
          </h1>
          <p className="mt-3 text-(--profile-muted)">
            Choose your public theme.
          </p>
            <h2 className="text-xl font-semibold">Theme</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {themes.map((theme) => (
                <label
                  key={theme}
                  className="cursor-pointer rounded-2xl border border-(--profile-border) bg-(--profile-panel) p-4 hover:opacity-90"
                >
                  <input
                    type="radio"
                    name="publicTheme"
                    value={theme}
                    defaultChecked={data.settings.publicTheme === theme}
                    className="mb-3"
                  />
                  <span className="capitalize">{theme}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="rounded-2xl bg-(--profile-accent) px-5 py-3 text-sm font-medium text-black"
          >
            Save Settings
          </button>
        </form>
      </section>
    </main>
  );
}