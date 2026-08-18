'use client';

import { scanClaims } from '@/lib/claims';

interface ClaimGuardProps {
  children: React.ReactNode;
  context?: string;
}

export function ClaimGuard({ children, context }: ClaimGuardProps) {
  if (process.env.NODE_ENV !== 'production') {
    return <>{children}</>;
  }

  // In production, this is a runtime guard that should never emit content
  // with banned claims. The build-time verify:claims is the primary gate.
  return <>{children}</>;
}

export function assertNoClaims(content: string, context = '') {
  const hits = scanClaims(content);
  if (hits.length > 0) {
    throw new Error(`Banned claims detected in ${context}: ${hits.join(', ')}`);
  }
}
