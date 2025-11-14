
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
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-100">Scheduled Jobs</h2>
          <span className="pill bg-slate-800/80 text-slate-200 border border-slate-700/80">
            {loading ? 'Loading…' : `${jobs.length} total`}
          </span>
        </div>
        <div className="divide-y divide-slate-800/80">
          {jobs.map(job => (
            <div key={job.id} className="flex items-center justify-between py-3 text-sm">
              <div className="flex-1">
                <div className="font-medium text-slate-100">Customer #{job.customer_id}</div>
                <div className="text-xs text-slate-400 mt-0.5">{job.type}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-300">{job.time}</span>
                <Badge color={job.status === 'Pending' ? 'amber' : 'green'}>
                  {job.status}
                </Badge>
              </div>
            </div>
          ))}
          {!loading && jobs.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-400 mb-1">No jobs scheduled yet</p>
              <p className="text-xs text-slate-500">
                Add a customer and create a job to get started
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
