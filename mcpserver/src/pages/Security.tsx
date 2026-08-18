import { Link } from 'react-router-dom';

export function Security() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Security & Compliance</h1>
        <p className="text-xl text-gray-400 mb-8">
          codeMicro is committed to maintaining the highest standards of security and data protection.
        </p>
        <div className="space-y-8">
          <section className="rounded-xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Infrastructure Security</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                TLS 1.3 encryption for all data in transit
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                SOC 2 Type II compliant hosting infrastructure
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                Regular penetration testing and vulnerability assessments
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                Automated dependency scanning and supply chain verification
              </li>
            </ul>
          </section>
          <section className="rounded-xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                No collection of sensitive personal data without explicit consent
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                GDPR and Indian DPDP Act aligned data practices
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green mt-1">✓</span>
                Right to erasure and data portability supported
              </li>
            </ul>
          </section>
          <section className="rounded-xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Report a Vulnerability</h2>
            <p className="text-gray-300 mb-4">
              We take security seriously. If you discover a vulnerability, please report it responsibly.
            </p>
            <a
              href="mailto:security@codemicro.dev"
              className="text-brand-cyan hover:underline"
            >
              security@codemicro.dev
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
