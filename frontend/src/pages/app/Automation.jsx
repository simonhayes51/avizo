
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const rules = [
  { id: 'a1', name: 'Appointment confirmation', timing: 'Immediately', channel: 'SMS + WhatsApp', status: 'active' },
  { id: 'a2', name: 'Reminder', timing: '1 day before', channel: 'SMS', status: 'active' },
  { id: 'a3', name: 'On the way', timing: 'Manual tap', channel: 'WhatsApp', status: 'active' },
  { id: 'a4', name: 'Aftercare', timing: '1 day after', channel: 'SMS + Smart page', status: 'active' },
  { id: 'a5', name: 'Review request', timing: '3 days after', channel: 'SMS', status: 'active' },
  { id: 'a6', name: 'Rebook reminder', timing: '6 weeks later', channel: 'SMS + Smart page', status: 'active' }
];

export default function Automation() {
  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-100 mb-1">
          Automation Rules
        </h2>
        <p className="text-xs text-slate-400">
          Your automated messaging timeline for customer communication
        </p>
      </div>
      <ol className="space-y-2 text-xs">
        {rules.map((rule, idx) => (
          <li
            key={rule.id}
            className="flex items-center gap-3 rounded-xl border border-slate-800/90 bg-slate-950/70 px-3 py-2.5"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-slate-200 border border-slate-700">
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="text-slate-100 font-medium">{rule.name}</div>
              <div className="text-[11px] text-slate-400">
                {rule.timing} · {rule.channel}
              </div>
            </div>
            <Badge color="green" className="text-[10px]">{rule.status}</Badge>
          </li>
        ))}
      </ol>
    </Card>
  );
}
