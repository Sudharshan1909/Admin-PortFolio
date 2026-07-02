"use client";

import { signOut } from "next-auth/react";

export default function AdminTopbar({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end gap-3 border-b border-white/10 p-4">
      <button
        onClick={onSave}
        className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black"
      >
        Save Changes
      </button>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white"
      >
        Logout
      </button>
    </div>
  );
}