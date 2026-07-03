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
    <header className="flex items-center justify-between border-b border-white/10 px-8 py-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/35">
          {subtitle}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1>
      </div>

      <div>{actions}</div>
    </header>
  );
}
