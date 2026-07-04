"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardForm from "@/components/dashboard-form";
import { updateExperience } from "../actions";

type ExperienceItem = {
  company: string;
  location: string;
  employmentType: string;
  role: string;
  duration: string;
  description: string;
};

type ExperienceFormProps = {
  initialEntries: ExperienceItem[];
};

const emptyEntry: ExperienceItem = {
  company: "",
  location: "",
  employmentType: "",
  role: "",
  duration: "",
  description: "",
};

const locationOptions = ["Remote", "On-site"];
const employmentTypeOptions = [
  "Intern",
  "Contract Based",
  "Project Based",
  "Flexible Work",
];

export default function ExperienceForm({
  initialEntries,
}: ExperienceFormProps) {
  const [entries, setEntries] = useState<ExperienceItem[]>(
    initialEntries.length > 0 ? initialEntries : [emptyEntry]
  );

  const updateEntry = (
    index: number,
    field: keyof ExperienceItem,
    value: string
  ) => {
    setEntries((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addEntry = () => {
    setEntries((prev) => [...prev, { ...emptyEntry }]);
  };

  const removeEntry = (index: number) => {
    setEntries((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <DashboardHeader title="Experience" subtitle="Manage section" />

      <div className="p-4 sm:p-6 lg:p-8">
        <DashboardForm action={updateExperience}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-(--profile-fg)">
                Experience Details
              </h2>
              <p className="mt-1 text-sm text-(--profile-muted)">
                Add company, location, work type, role, duration, and description.
              </p>
            </div>

            <button
              type="button"
              onClick={addEntry}
              className="rounded-2xl bg-(--profile-accent) px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
            >
              Add +
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="rounded-3xl border border-(--profile-border) bg-(--profile-panel) p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-medium text-(--profile-fg)">
                    Experience Entry {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeEntry(index)}
                    className="rounded-xl border border-red-400/30 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={entry.company}
                      onChange={(e) =>
                        updateEntry(index, "company", e.target.value)
                      }
                      placeholder="Example: Zoho"
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Role
                    </label>
                    <input
                      type="text"
                      value={entry.role}
                      onChange={(e) =>
                        updateEntry(index, "role", e.target.value)
                      }
                      placeholder="Example: Frontend Developer Intern"
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg)ine-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Location
                    </label>
                    <select
                      value={entry.location}
                      onChange={(e) =>
                        updateEntry(index, "location", e.target.value)
                      }
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg)ine-none"
                    >
                      <option value="">Select location</option>
                      {locationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Employee Type
                    </label>
                    <select
                      value={entry.employmentType}
                      onChange={(e) =>
                        updateEntry(index, "employmentType", e.target.value)
                      }
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    >
                      <option value="">Select employee type</option>
                      {employmentTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={entry.duration}
                      onChange={(e) =>
                        updateEntry(index, "duration", e.target.value)
                      }
                      placeholder="Example: 11 months or 1 yr 11 months"
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Description
                    </label>
                    <textarea
                      rows={5}
                      value={entry.description}
                      onChange={(e) =>
                        updateEntry(index, "description", e.target.value)
                      }
                      placeholder="Describe your experience and contributions"
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <input
            type="hidden"
            name="experienceItems"
            value={JSON.stringify(entries)}
            readOnly
          />
        </DashboardForm>
      </div>
    </>
  );
}