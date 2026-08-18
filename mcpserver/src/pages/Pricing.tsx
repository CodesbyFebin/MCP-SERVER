import { useState } from 'react';
import { PricingTable } from '../components/PricingTable';
import { SchemaJsonLd } from '../components/SchemaJsonLd';
import { buildWebPageSchema } from '../lib/schema';
import { SITE_CONFIG } from '../data/site';
import { PLANS } from '../data/pricing';

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  const pageSchema = buildWebPageSchema({
    id: `${SITE_CONFIG.url}/pricing`,
    title: 'Pricing Plans',
    description: 'Flexible plans with Indian payment integrations. Choose between Free, Pro, and Enterprise tiers with USD and INR pricing.',
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <SchemaJsonLd schema={pageSchema} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your development workflow.
          </p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <div className="inline-flex rounded-lg bg-white/5 p-1">
            <button
              onClick={() => setCurrency('USD')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currency === 'USD'
                  ? 'bg-brand-cyan text-brand-bg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currency === 'INR'
                  ? 'bg-brand-cyan text-brand-bg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
          </div>
          <div className="inline-flex rounded-lg bg-white/5 p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                !yearly ? 'bg-brand-cyan text-brand-bg' : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                yearly ? 'bg-brand-cyan text-brand-bg' : 'text-gray-300 hover:text-white'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <PricingTable yearly={yearly} />
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>
            Need a custom plan? <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-cyan hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
