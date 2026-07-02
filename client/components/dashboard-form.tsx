"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

type DashboardFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
};

export default function DashboardForm({
  action,
  children,
}: DashboardFormProps) {
  return (
    <form action={action} className="space-y-8">
      {children}

      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="text-sm text-white/45">
          Save your changes to update the site content.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}