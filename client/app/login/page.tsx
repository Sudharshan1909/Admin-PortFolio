import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-md rounded-4xl border border-white/10 bg-white/4 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Admin Access
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/60">
          Sign in to manage your public portfolio content.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}