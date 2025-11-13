
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition shadow-sm';
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-400 text-white',
    ghost: 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-100',
    outline: 'border border-slate-600 hover:bg-slate-800 text-slate-100',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
