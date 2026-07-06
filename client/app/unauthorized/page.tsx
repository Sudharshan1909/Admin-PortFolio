import Link from "next/link";
import { redirect } from "next/navigation";

type UnauthorizedPageProps = {
  searchParams?: Promise<{
    error?: string;
    reason?: string;
  }>;
};

export default async function UnauthorizedPage({
  searchParams,
}: UnauthorizedPageProps) {
  const params = await searchParams;
  const isUnauthorized =
    params?.error === "AccessDenied" || params?.reason === "unauthorized";

  if (!isUnauthorized) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-red-500/25 bg-white/5 px-6 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur sm:px-12 sm:py-14">
        <p className="text-sm uppercase tracking-[0.45em] text-red-300/75">
          Access Denied
        </p>

        <h1 className="mx-auto mt-7 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Authentication failed. Please use the authorized admin account.
        </h1>

        <p className="mt-6 text-base text-white/60 sm:text-lg">
          Sign in only with the approved admin Gmail account.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 px-7 py-3 text-sm text-white/80 transition hover:bg-white/10"
          >
            Go Home
          </Link>

          <Link
            href="/login"
            className="rounded-2xl bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
}
