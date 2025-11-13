
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

const tiers = [
  {
    name: 'Basic',
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
    name: 'Pro',
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
    name: 'Premium',
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
    <div className="grid gap-4 lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`flex flex-col justify-between ${
            tier.highlight ? 'border-brand-500/70 bg-slate-950/80' : ''
          }`}
        >
          <div>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                {tier.name}
              </h2>
              {tier.highlight && (
                <span className="pill bg-emerald-500/20 text-emerald-200 border border-emerald-400/50">
                  Most popular
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
            <ul className="mb-4 space-y-1.5 text-xs text-slate-300">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant={tier.highlight ? 'primary' : 'ghost'}
            className="w-full mt-2"
          >
            Start with {tier.name}
          </Button>
        </Card>
      ))}
    </div>
  );
}
