
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { api } from '../api.js';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.waitlist(email);
      setStatus('added');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen brand-gradient flex items-center justify-center px-4">
      <div className="max-w-3xl glass-panel border-slate-800/70 shadow-soft flex flex-col md:flex-row gap-8 md:gap-10 p-6 md:p-10 bg-slate-950/70">
        <div className="flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300 border border-slate-700/70">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-xs">●</span>
            Avizo is coming soon — early access for small service businesses.
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
            Keep your clients in the loop. <span className="text-brand-200">Automatically.</span>
          </h1>
          <p className="text-sm md:text-[15px] leading-relaxed text-slate-300">
            Avizo sends appointment confirmations, reminders, on-the-way texts, aftercare and rebook nudges
            for you — over SMS and WhatsApp — so you look ultra professional without lifting a finger.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
            />
            <Button type="submit" className="w-full sm:w-auto">
              {status === 'added' ? 'Added ✔' : 'Join waitlist'}
            </Button>
          </form>
          <p className="text-[11px] text-slate-400">
            No spam. Just an invite when Avizo is ready.
          </p>
          {status === 'error' && (
            <p className="text-[11px] text-rose-400">
              Something went wrong adding you. Try again in a second.
            </p>
          )}
          <div className="pt-2 flex flex-wrap gap-3 text-[11px]">
            <button
              onClick={() => navigate('/app')}
              className="text-brand-200 hover:text-brand-100 underline underline-offset-4"
            >
              Jump into the live dashboard demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
