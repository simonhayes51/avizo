
export default function Badge({ children, color = 'green' }) {
  const colors = {
    green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    blue: 'bg-brand-500/15 text-brand-200 border-brand-500/40',
    amber: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
    slate: 'bg-slate-700/60 text-slate-200 border-slate-500/60',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}
