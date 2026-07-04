import { ReactNode } from "react";
import { PublicThemeName } from "@/lib/site-data";

type Props = {
  theme: PublicThemeName;
  children: ReactNode;
};

/**
 * Wraps public pages and applies the selected theme class,
 * which controls CSS variables like --profile-bg, --profile-surface, etc.
 */
export default function PublicThemeShell({ theme, children }: Props) {
  return <div className={`public-theme theme-${theme}`}>{children}</div>;
}