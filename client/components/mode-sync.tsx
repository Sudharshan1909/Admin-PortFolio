"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ModeSync({ mode }: { mode: "dark" | "light" }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);

  return null;
}