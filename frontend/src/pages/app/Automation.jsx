
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const rules = [
  { id: 'a1', name: 'Appointment confirmation', timing: 'Immediately', channel: 'SMS + WhatsApp' },
  { id: 'a2', name: 'Reminder', timing: '1 day before', channel: 'SMS' },
  { id: 'a3', name: 'On the way', timing: 'Manual tap', channel: 'WhatsApp' },
  { id: 'a4', name: 'Aftercare', timing: '1 day after', channel: 'SMS + Smart page' },
  { id: 'a5', name: 'Review request', timing: '1 day after', channel: 'SMS' },
  { id: 'a6', name: 'Rebook reminder', timing: '6 weeks later', channel: 'SMS + Smart page' }
];

export default function Automation() {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Automation timeline
          </h2>
          <p className="text-xs text-slate-400">
            The default journey every new job follows.
          </p>
        </div>
        <Badge color="blue">Live · Demo copy</Badge>
      </div>
      <ol className="space-y-2 text-xs">
        {rules.map((rule, idx) => (
          <li
            key={rule.id}
            className="flex items-center gap-3 rounded-xl border border-slate-800/90 bg-slate-950/70 px-3 py-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-slate-200 border border-slate-700">
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="text-slate-100">{rule.name}</div>
              <div className="text-[11px] text-slate-400">
                {rule.timing} · {rule.channel}
              </div>
            </div>
            <button className="rounded-lg border border-slate-700 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-800/70">
              Edit
            </button>
          </li>
        ))}
      </ol>
    </Card>
  );
}
