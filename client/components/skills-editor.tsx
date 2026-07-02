"use client";

import { useState } from "react";
import DashboardForm from "@/components/dashboard-form";
import { updateSkills } from "@/app/dashboard/actions";

type SkillsEditorProps = {
  initialTechnical: string[];
  initialSoft: string[];
};

function normalizeSkills(values: string[]) {
  return values.map((item) => item.trim()).filter(Boolean);
}

export default function SkillsEditor({
  initialTechnical,
  initialSoft,
}: SkillsEditorProps) {
  const [technical, setTechnical] = useState<string[]>(
    initialTechnical.length ? initialTechnical : [""]
  );
  const [soft, setSoft] = useState<string[]>(
    initialSoft.length ? initialSoft : [""]
  );

  const [editingTechnical, setEditingTechnical] = useState(
    initialTechnical.length === 0
  );
  const [editingSoft, setEditingSoft] = useState(initialSoft.length === 0);

  const updateTechnical = (index: number, value: string) => {
    setTechnical((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const updateSoft = (index: number, value: string) => {
    setSoft((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addTechnical = () => {
    setTechnical((prev) => [...prev, ""]);
    setEditingTechnical(true);
  };

  const addSoft = () => {
    setSoft((prev) => [...prev, ""]);
    setEditingSoft(true);
  };

  const removeTechnical = (index: number) => {
    setTechnical((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [""];
    });
  };

  const removeSoft = (index: number) => {
    setSoft((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [""];
    });
  };

  const technicalPreview = normalizeSkills(technical);
  const softPreview = normalizeSkills(soft);

  return (
    <DashboardForm action={updateSkills}>
      <div className="space-y-8">
        <input
  type="hidden"
  name="technical"
  value={normalizeSkills(technical).join("\n")}
  readOnly
/>
<input
  type="hidden"
  name="soft"
  value={normalizeSkills(soft).join("\n")}
  readOnly
/>
        <section className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Technical Skills</h2>
              <p className="mt-1 text-sm text-white/45">
                Add, rename, or remove technical skills.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditingTechnical((prev) => !prev)}
                className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {editingTechnical ? "Done" : "Edit"}
              </button>

              <button
                type="button"
                onClick={addTechnical}
                className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Add +
              </button>
            </div>
          </div>

          {editingTechnical ? (
            <div className="mt-6 space-y-3">
              {technical.map((skill, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={skill}
                    onChange={(e) => updateTechnical(index, e.target.value)}
                    placeholder="Enter technical skill"
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeTechnical(index)}
                    className="rounded-2xl border border-red-500/30 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {technicalPreview.length ? (
                technicalPreview.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-white/45">No technical skills added yet.</p>
              )}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Soft Skills</h2>
              <p className="mt-1 text-sm text-white/45">
                Add, rename, or remove soft skills.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditingSoft((prev) => !prev)}
                className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {editingSoft ? "Done" : "Edit"}
              </button>

              <button
                type="button"
                onClick={addSoft}
                className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Add +
              </button>
            </div>
          </div>

          {editingSoft ? (
            <div className="mt-6 space-y-3">
              {soft.map((skill, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={skill}
                    onChange={(e) => updateSoft(index, e.target.value)}
                    placeholder="Enter soft skill"
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeSoft(index)}
                    className="rounded-2xl border border-red-500/30 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {softPreview.length ? (
                softPreview.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-white/45">No soft skills added yet.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </DashboardForm>
  );
}