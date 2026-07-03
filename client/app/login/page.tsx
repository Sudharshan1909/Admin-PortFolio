import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.35em] text-white/35">
          Admin Access
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Sign in to continue
        </h1>

        <p className="mt-3 text-white/60">
          Only the authorized admin Google account can access the dashboard.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}