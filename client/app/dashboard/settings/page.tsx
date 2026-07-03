// import { getSiteData } from "@/lib/site-data";
// import { updateThemeSettings } from "./action";

// const themes = [
//   "midnight",
//   "ocean",
//   "emerald",
//   "rose",
//   "amber",
//   "violet",
//   "slate",
//   "crimson",
//   "forest",
//   "neon",
// ] as const;

// export default async function SettingsPage() {
//   const data = await getSiteData();

//   return (
//     <main className="min-h-screen bg-zinc-950 px-4 py-6 text-white">
//       <section className="mx-auto max-w-6xl space-y-8">
//         <header className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
//           <h1 className="text-3xl font-semibold tracking-tight">
//             Public Profile Settings
//           </h1>
//           <p className="mt-3 text-white/60">
//             Choose your public theme and screen mode.
//           </p>
//         </header>

//         <form
//           action={updateThemeSettings}
//           className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6"
//         >
//           <div>
//             <h2 className="text-xl font-semibold">Theme</h2>
//             <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
//               {themes.map((theme) => (
//                 <label
//                   key={theme}
//                   className="cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-white/20"
//                 >
//                   <input
//                     type="radio"
//                     name="publicTheme"
//                     value={theme}
//                     defaultChecked={data.settings.publicTheme === theme}
//                     className="mb-3"
//                   />
//                   <span className="capitalize">{theme}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold">Mode</h2>
//             <div className="mt-4 flex gap-4">
//               <label className="cursor-pointer rounded-2xl border border-white/10 px-4 py-3">
//                 <input
//                   type="radio"
//                   name="screenMode"
//                   value="dark"
//                   defaultChecked={data.settings.screenMode === "dark"}
//                   className="mr-2"
//                 />
//                 Dark
//               </label>

//               <label className="cursor-pointer rounded-2xl border border-white/10 px-4 py-3">
//                 <input
//                   type="radio"
//                   name="screenMode"
//                   value="light"
//                   defaultChecked={data.settings.screenMode === "light"}
//                   className="mr-2"
//                 />
//                 Light
//               </label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black"
//           >
//             Save Settings
//           </button>
//         </form>
//       </section>
//     </main>
//   );
// }