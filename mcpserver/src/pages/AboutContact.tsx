import { useState } from 'react';
import { SITE_CONFIG } from '../data/site';

export function AboutContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h1 className="text-3xl font-bold text-white mb-6">About codeMicro</h1>
            <p className="text-gray-300 leading-relaxed mb-6">
              codeMicro is the leading directory and developer platform for the Model Context Protocol ecosystem. We help developers discover, evaluate, and integrate MCP servers with confidence.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Based in Bengaluru, India, our team is dedicated to building open-source tooling and documentation that accelerates AI adoption across the industry.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Headquarters</h2>
              <address className="not-italic text-gray-400 leading-relaxed">
                <p>{SITE_CONFIG.address.street}</p>
                <p>{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</p>
                <p>{SITE_CONFIG.address.country} {SITE_CONFIG.address.postalCode}</p>
              </address>
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            {submitted ? (
              <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-6 text-brand-green">
                Thank you for reaching out! We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-cyan px-6 py-3 font-semibold text-brand-bg hover:bg-brand-cyan/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
