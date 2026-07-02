"use client";

export default function AddButton({
  onClick,
  label = "Add"
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
    >
      <span className="text-lg leading-none">+</span>
      {label}
    </button>
  );
}