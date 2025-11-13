
import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { api } from '../../api.js';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  async function load() {
    try {
      const data = await api.getCustomers();
      setCustomers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      phone: form.get('phone'),
      email: form.get('email') || null,
      location: form.get('location') || null,
      last_service: form.get('last_service') || null,
      next_job_at: form.get('next_job_at') || null,
    };
    try {
      await api.addCustomer(payload);
      e.currentTarget.reset();
      setAdding(false);
      load();
    } catch (err) {
      console.error(err);
      alert('Error adding customer');
    }
  }

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">Customers</h2>
          <p className="text-xs text-slate-400">
            Stored in the real database via the API.
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-xs px-3 py-1.5"
          onClick={() => setAdding((v) => !v)}
        >
          {adding ? 'Cancel' : 'Add customer'}
        </Button>
      </div>
      {adding && (
        <form
          onSubmit={handleAdd}
          className="grid gap-2 text-xs sm:grid-cols-3 mb-4 items-end"
        >
          <Input name="name" label="Name" required placeholder="Customer name" />
          <Input name="phone" label="Phone" required placeholder="+44..." />
          <Input name="email" label="Email" placeholder="customer@example.com" />
          <Input name="location" label="Location" placeholder="Town / area" />
          <Input name="last_service" label="Last service" placeholder="Deep clean" />
          <Input name="next_job_at" label="Next job" placeholder="Next Tuesday · 2pm" />
          <Button type="submit" className="w-full mt-2 sm:mt-4">
            Save
          </Button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Contact</th>
              <th className="py-2 pr-4">Last service</th>
              <th className="py-2 pr-4">Next job</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-900/70 last:border-0"
              >
                <td className="py-2 pr-4 text-slate-100">{c.name}</td>
                <td className="py-2 pr-4 text-slate-300">
                  <div>{c.phone}</div>
                  <div className="text-slate-500 text-[11px]">{c.email}</div>
                </td>
                <td className="py-2 pr-4 text-slate-300">{c.last_service}</td>
                <td className="py-2 pr-4 text-slate-300">{c.next_job_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <p className="py-3 text-xs text-slate-400">Loading customers…</p>
        )}
        {!loading && customers.length === 0 && (
          <p className="py-3 text-xs text-slate-400">
            No customers yet. Add your first one above.
          </p>
        )}
      </div>
    </Card>
  );
}
