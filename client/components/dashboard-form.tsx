"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FormState = {
  success: boolean;
  message: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl bg-(--profile-accent) px-5 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

type DashboardFormProps = {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
};

const initialState: FormState = {
  success: false,
  message: "",
};

export default function DashboardForm({
  action,
  children,
}: DashboardFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8 rounded-3xl border border-(--profile-border) bg-(--profile-surface) p-6">
      {children}

      <div className="flex flex-col gap-3 border-t border-(--profile-border) pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-(--profile-muted)">
          Save your changes to update the site content.
        </p>

        <div className="flex items-center gap-4">
          {state.message ? (
            <p
              className={`text-sm font-medium ${
                state.success ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {state.message}
            </p>
          ) : null}
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}