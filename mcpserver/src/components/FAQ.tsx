import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  autoOpenId?: string;
}

export function FAQ({ items, autoOpenId }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(autoOpenId || null);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between p-4 text-left font-medium text-white hover:bg-white/5 transition-colors"
            aria-expanded={openId === item.id}
          >
            <span>{item.question}</span>
            <span className="text-brand-cyan text-xl leading-none">
              {openId === item.id ? '−' : '+'}
            </span>
          </button>
          {openId === item.id && (
            <div className="px-4 pb-4 text-gray-300 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
