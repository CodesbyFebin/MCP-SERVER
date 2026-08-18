export interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  currency: 'INR' | 'USD';
  features: string[];
  limits: {
    servers: number;
    requests: number;
    support: string;
  };
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individual developers exploring MCP.',
    priceMonthly: 0,
    priceYearly: 0,
    currency: 'USD',
    features: ['Access to public directory', 'Basic documentation', 'Community support'],
    limits: { servers: 5, requests: 1000, support: 'Community' },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professional developers and small teams.',
    priceMonthly: 29,
    priceYearly: 290,
    currency: 'USD',
    features: ['Unlimited server access', 'Advanced playground', 'Priority support', 'Custom integrations'],
    limits: { servers: -1, requests: 50000, support: 'Priority Email' },
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with dedicated infrastructure needs.',
    priceMonthly: 99,
    priceYearly: 990,
    currency: 'USD',
    features: ['Dedicated infrastructure', 'SLA guarantee', 'Custom contracts', 'On-premise option'],
    limits: { servers: -1, requests: -1, support: '24/7 Dedicated' },
  },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'INR', symbol: '₹', rate: 83.5 },
] as const;
