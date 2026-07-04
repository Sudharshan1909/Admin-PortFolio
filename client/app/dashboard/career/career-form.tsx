"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardForm from "@/components/dashboard-form";
import { updateCareer } from "../actions";

type CareerEntry = {
  institution: string;
  degree: string;
  from: string;
  to: string;
  cgpa: string;
};

type CareerFormProps = {
  initialEntries: CareerEntry[];
};

const emptyEntry: CareerEntry = {
  institution: "",
  degree: "",
  from: "",
  to: "",
  cgpa: "",
};

const collegeOptions = [
  "IIT Madras",
  "Anna University - College of Engineering, Guindy",
  "Madras Institute of Technology",
  "SSN College of Engineering",
  "SRM Institute of Science and Technology",
  "Sathyabama Institute of Science and Technology",
  "Rajalakshmi Engineering College",
  "Chennai Institute of Technology",
  "St. Joseph's College of Engineering",
  "Panimalar Engineering College",
  "Easwari Engineering College",
  "Velammal Engineering College",
  "Saveetha Engineering College",
  "Sri Sairam Engineering College",
  "Sri Venkateswara College of Engineering",
  "Jeppiaar Engineering College",
  "Hindustan Institute of Technology and Science",
  "Loyola-ICAM College of Engineering and Technology",
  "Meenakshi Sundararajan Engineering College",
  "R.M.K. Engineering College",
  "R.M.D. Engineering College",
  "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology",
];

const degreeOptions = [
  "B.E. Computer Science and Engineering",
  "B.E. Electronics and Communication Engineering",
  "B.E. Electrical and Electronics Engineering",
  "B.E. Mechanical Engineering",
  "B.E. Civil Engineering",
  "B.E. Information Science and Engineering",
  "B.Tech. Information Technology",
  "B.Tech. Computer Science and Engineering",
  "B.Tech. Artificial Intelligence and Data Science",
  "B.Tech. Artificial Intelligence and Machine Learning",
  "B.Tech. Biotechnology",
  "B.Tech. Chemical Engineering",
  "B.Tech. Biomedical Engineering",
  "B.Tech. Aeronautical Engineering",
  "M.E. Computer Science and Engineering",
  "M.E. Applied Electronics",
  "M.E. Communication Systems",
  "M.E. Power Systems Engineering",
  "M.E. Embedded Systems Technologies",
  "M.Tech. Information Technology",
];

export default function CareerForm({ initialEntries }: CareerFormProps) {
  const [entries, setEntries] = useState<CareerEntry[]>(
    initialEntries.length > 0 ? initialEntries : [emptyEntry]
  );

  const updateEntry = (
    index: number,
    field: keyof CareerEntry,
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
      <DashboardHeader title="Career" subtitle="Manage education details" />

      <div className="p-4 sm:p-6 lg:p-8">
        <DashboardForm action={updateCareer}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-(--profile-fg)">
                Education History
              </h2>
              <p className="mt-1 text-sm text-(--profile-muted)">
                Add institution, degree, duration, and CGPA.
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
                    Career Entry {index + 1}
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
                      Institution Name
                    </label>
                    <select
                      value={entry.institution}
                      onChange={(e) =>
                        updateEntry(index, "institution", e.target.value)
                      }
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    >
                      <option value="">Select college</option>
                      {collegeOptions.map((college) => (
                        <option key={college} value={college}>
                          {college}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      Degree
                    </label>
                    <select
                      value={entry.degree}
                      onChange={(e) =>
                        updateEntry(index, "degree", e.target.value)
                      }
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    >
                      <option value="">Select degree</option>
                      {degreeOptions.map((degree) => (
                        <option key={degree} value={degree}>
                          {degree}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      From
                    </label>
                    <input
                      type="month"
                      value={entry.from}
                      onChange={(e) =>
                        updateEntry(index, "from", e.target.value)
                      }
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      To
                    </label>
                    <input
                      type="month"
                      value={entry.to}
                      onChange={(e) =>
                        updateEntry(index, "to", e.target.value)
                      }
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-(--profile-muted)">
                      CGPA
                    </label>
                    <input
                      type="text"
                      value={entry.cgpa}
                      onChange={(e) =>
                        updateEntry(index, "cgpa", e.target.value)
                      }
                      placeholder="Example: 8.6"
                      className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <input
            type="hidden"
            name="careerEducation"
            value={JSON.stringify(entries)}
            readOnly
          />
        </DashboardForm>
      </div>
    </>
  );
}