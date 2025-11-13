
import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { api } from '../../api.js';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getJobs();
        setJobs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-100">Jobs</h2>
            <span className="pill bg-slate-800/80 text-slate-200 border border-slate-700/80">
              {loading ? 'Loading…' : `${jobs.length} scheduled`}
            </span>
          </div>
          <div className="divide-y divide-slate-800/80">
            {jobs.map(job => (
              <div key={job.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <div className="font-medium text-slate-100">Customer #{job.customer_id}</div>
                  <div className="text-xs text-slate-400">{job.type}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-300">{job.time}</span>
                  <Badge color={job.status === 'Pending' ? 'amber' : 'green'}>
                    {job.status}
                  </Badge>
                </div>
              </div>
            ))}
            {!loading && jobs.length === 0 && (
              <p className="py-4 text-xs text-slate-400">
                No jobs yet. Add a customer and log a job to see them here.
              </p>
            )}
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h2 className="mb-2 text-sm font-semibold text-slate-100">Messages queued</h2>
            <p className="text-3xl font-semibold text-brand-200">12</p>
            <p className="mt-1 text-xs text-slate-400">
              Placeholder metric for now. Hook into real data later.
            </p>
          </Card>
          <Card>
            <h2 className="mb-2 text-sm font-semibold text-slate-100">Rebook nudges</h2>
            <p className="text-3xl font-semibold text-emerald-200">7</p>
            <p className="mt-1 text-xs text-slate-400">
              Customers who are due a follow-up based on your rules.
            </p>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-100">Today&apos;s Smart Messages</h2>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between">
              <span className="text-slate-300">Appointment confirm</span>
              <span className="text-emerald-300">5 sent</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-300">Reminders</span>
              <span className="text-brand-200">3 scheduled</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-300">Review nudges</span>
              <span className="text-slate-200">4 later today</span>
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className="mb-2 text-sm font-semibold text-slate-100">This week</h2>
          <p className="text-xs text-slate-300 mb-2">
            High-level snapshot of how Avizo is helping (placeholder copy).
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>• 32 confirmations auto-sent</li>
            <li>• 18 reminders stopped no-shows</li>
            <li>• 11 reviews requested</li>
            <li>• 6 customers nudged to rebook</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
