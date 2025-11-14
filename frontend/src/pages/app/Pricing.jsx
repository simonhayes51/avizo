
import Card from '../../components/ui/Card.jsx';

const tiers = [
  {
    name: 'Starter',
    price: 9,
    description: 'For solo operators and side hustles.',
    features: [
      'Up to 150 messages / month',
      'Confirmation & reminders',
      'Review + rebook nudges',
      'Shared system number'
    ]
  },
  {
    name: 'Professional',
    price: 19,
    highlight: true,
    description: 'For busy small teams who want to look ultra professional.',
    features: [
      'Up to 800 messages / month',
      'Full SMS + WhatsApp flows',
      'Smart message pages',
      'Simple shared inbox',
      'Priority support'
    ]
  },
  {
    name: 'Business',
    price: 39,
    description: 'For multi-site and high-volume service businesses.',
    features: [
      'Dedicated phone number',
      'WhatsApp business setup',
      'Unlimited messages',
      'Multi-staff logins',
      'Custom domain for smart pages'
    ]
  }
];

export default function Pricing() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-100 mb-1">Pricing Plans</h2>
        <p className="text-xs text-slate-400">
          Choose the plan that fits your business needs
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${
              tier.highlight ? 'border-brand-500/70 bg-slate-950/80' : ''
            }`}
          >
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-100">
                {tier.name}
              </h3>
              {tier.highlight && (
                <span className="pill bg-emerald-500/20 text-emerald-200 border border-emerald-400/50 text-[10px]">
                  Recommended
                </span>
              )}
            </div>
            <div className="mb-2">
              <span className="text-3xl font-semibold text-slate-50">
                £{tier.price}
              </span>
              <span className="text-xs text-slate-400"> / month</span>
            </div>
            <p className="mb-3 text-xs text-slate-400">{tier.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-slate-900/50 border border-slate-800/80 px-4 py-3">
        <p className="text-xs text-slate-300">
          All plans include secure authentication, customer management, and job scheduling.
          Contact support to upgrade or change your plan.
        </p>
      </div>
    </div>
  );
}
