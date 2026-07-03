"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const message =
    error === "AccessDenied"
      ? "You do not have access to the admin profile."
      : "Authentication failed. Please use the authorized admin account.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-red-300/70">
          Access Denied
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {message}
        </h1>

        <p className="mt-4 text-white/60">
          Sign in only with the approved admin Gmail account.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            Go Home
          </Link>

          <Link
            href="/login"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
}