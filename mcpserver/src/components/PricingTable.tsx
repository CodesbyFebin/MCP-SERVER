import { PLANS, CURRENCIES } from '../data/pricing';

interface PricingTableProps {
  yearly?: boolean;
}

export function PricingTable({ yearly = false }: PricingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 px-4 text-gray-400 font-medium">Plan</th>
            <th className="py-4 px-4 text-gray-400 font-medium">Price</th>
            <th className="py-4 px-4 text-gray-400 font-medium">Features</th>
            <th className="py-4 px-4 text-gray-400 font-medium">Limits</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {PLANS.map((plan) => (
            <tr key={plan.id} className={plan.popular ? 'bg-brand-cyan/5' : ''}>
              <td className="py-6 px-4">
                <div className="font-semibold text-white">{plan.name}</div>
                <div className="text-sm text-gray-400">{plan.description}</div>
                {plan.popular && (
                  <span className="inline-block mt-2 rounded-full bg-brand-cyan/20 px-2 py-0.5 text-xs text-brand-cyan">
                    Popular
                  </span>
                )}
              </td>
              <td className="py-6 px-4">
                <div className="text-2xl font-bold text-white">
                  ${yearly ? plan.priceYearly : plan.priceMonthly}
                  {plan.priceMonthly > 0 && (
                    <span className="text-sm text-gray-400 font-normal">
                      /{yearly ? 'yr' : 'mo'}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-6 px-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-brand-green mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-6 px-4 text-sm text-gray-400">
                <div>Servers: {plan.limits.servers === -1 ? 'Unlimited' : plan.limits.servers}</div>
                <div>Requests: {plan.limits.requests === -1 ? 'Unlimited' : plan.limits.requests.toLocaleString()}</div>
                <div>Support: {plan.limits.support}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
