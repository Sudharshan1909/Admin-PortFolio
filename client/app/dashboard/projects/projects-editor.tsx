"use client";

import { useState } from "react";
import DashboardForm from "@/components/dashboard-form";
import { updateProjects } from "../actions";

type ProjectItem = {
  title: string;
  demoText: string;
  link: string;
  description: string;
};

type ProjectViewItem = {
  title: string;
  demoText: string;
  link: string;
  description: string;
};

type ProjectsEditorProps = {
  initialProjects: ProjectItem[];
};

const emptyProject: ProjectViewItem = {
  title: "",
  demoText: "Live Demo",
  link: "",
  description: "",
};

export default function ProjectsEditor({
  initialProjects,
}: ProjectsEditorProps) {
  const [projects, setProjects] = useState<ProjectViewItem[]>(
    initialProjects.length
      ? initialProjects.map((item) => ({
          title: item.title ?? "",
          demoText: item.demoText || "Live Demo",
          link: item.link ?? "",
          description: item.description ?? "",
        }))
      : [emptyProject]
  );

  const updateProject = (
    index: number,
    field: keyof ProjectViewItem,
    value: string
  ) => {
    setProjects((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addProject = () => {
    setProjects((prev) => [...prev, { ...emptyProject }]);
  };

  const removeProject = (index: number) => {
    setProjects((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );
  };

  const cleanedProjects = projects.map((item) => ({
    title: item.title.trim(),
    demoText: item.demoText.trim(),
    link: item.link.trim(),
    description: item.description.trim(),
  }));

  return (
    <DashboardForm action={updateProjects}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-(--profile-fg)">
            Projects
          </h2>
          <p className="mt-1 text-sm text-(--profile-muted)">
            Add project title, demo label, project link, and description.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="rounded-2xl bg-(--profile-accent) px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
        >
          Add +
        </button>
      </div>

      <div className="mt-8 space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-3xl border border-(--profile-border) bg-(--profile-panel) p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-base font-medium text-(--profile-fg)">
                Project {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeProject(index)}
                className="rounded-xl border border-red-400/30 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-2 block text-sm text-(--profile-muted)">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    updateProject(index, "title", e.target.value)
                  }
                  placeholder="Enter project title"
                  className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-(--profile-muted)">
                    Left-side Text
                  </label>
                  <input
                    type="text"
                    value={project.demoText}
                    onChange={(e) =>
                      updateProject(index, "demoText", e.target.value)
                    }
                    placeholder="Live Demo"
                    className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-(--profile-muted)">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) =>
                      updateProject(index, "link", e.target.value)
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-(--profile-muted)">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Specify details about the project"
                  className="w-full rounded-2xl border border-(--profile-border) bg-(--profile-bg) px-4 py-3 text-(--profile-fg) outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <input
        type="hidden"
        name="projectsData"
        value={JSON.stringify(cleanedProjects)}
        readOnly
      />
    </DashboardForm>
  );
}