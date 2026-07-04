export default function DashboardHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between border-b border-(--profile-border) px-8 py-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-(--profile-muted)">
          {subtitle}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-(--profile-fg)">
          {title}
        </h1>
      </div>

      <div>{actions}</div>
    </header>
  );
}