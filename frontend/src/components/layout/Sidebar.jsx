
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/app', label: 'Dashboard' },
  { to: '/app/inbox', label: 'Inbox' },
  { to: '/app/customers', label: 'Customers' },
  { to: '/app/automation', label: 'Automation' },
  { to: '/app/pricing', label: 'Pricing' },
];

export default function Sidebar() {
  return (
    <aside className="glass-panel h-full w-60 flex-col justify-between bg-slate-950/80 px-4 py-5 hidden md:flex">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-brand-500 flex items-center justify-center text-xl font-black text-slate-950">
            A
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Avizo</div>
            <div className="text-[11px] text-slate-400">Client updates, sorted.</div>
          </div>
        </div>
        <nav className="space-y-1">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/app'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-50 border border-brand-500/50'
                    : 'text-slate-300 hover:bg-slate-800/70'
                }`
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="rounded-xl bg-slate-900/80 px-3 py-3 text-[11px] text-slate-400">
        <div className="font-semibold text-slate-200 mb-1">Usage</div>
        <div className="flex items-center justify-between mb-1">
          <span>Messages this month</span>
          <span className="text-slate-100 font-medium">348</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-400 to-emerald-400" />
        </div>
      </div>
    </aside>
  );
}
