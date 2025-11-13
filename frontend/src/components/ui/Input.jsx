
export default function Input({ label, className = '', ...props }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-slate-300">
      {label && <span>{label}</span>}
      <input
        className={`rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 ${className}`}
        {...props}
      />
    </label>
  );
}
