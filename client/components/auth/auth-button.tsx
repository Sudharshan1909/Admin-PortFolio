"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full border border-white/20 px-4 py-2 text-sm text-white"
      >
        Sign out
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
    >
      Admin Login
    </Link>
  );
}