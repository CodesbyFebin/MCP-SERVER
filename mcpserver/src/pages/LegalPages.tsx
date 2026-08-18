import { useParams } from 'react-router-dom';

export function LegalPages() {
  const { slug } = useParams();

  const content: Record<string, { title: string; body: React.ReactNode }> = {
    privacy: {
      title: 'Privacy Policy',
      body: (
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>Last updated: August 2026</p>
          <p>
            codeMicro is operated by codeMicro Team, headquartered at HSR Layout, Bengaluru, Karnataka, India.
            This policy outlines how we collect, use, and protect your personal information when you use our platform.
          </p>
          <h3 className="text-xl font-bold text-white">Data Collection</h3>
          <p>
            We collect minimal data necessary to provide our services. This includes usage analytics, server registry metadata, and contact information you voluntarily provide.
          </p>
          <h3 className="text-xl font-bold text-white">Data Usage</h3>
          <p>
            Your data is used to improve platform performance, personalize your experience, and communicate important updates. We do not sell personal data to third parties.
          </p>
          <h3 className="text-xl font-bold text-white">Contact</h3>
          <p>
            For privacy-related inquiries, contact us at hello@codemicro.dev.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      body: (
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>Last updated: August 2026</p>
          <p>
            By accessing or using codeMicro, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
          </p>
          <h3 className="text-xl font-bold text-white">Acceptable Use</h3>
          <p>
            You agree not to misuse the platform or its services. This includes attempting to gain unauthorized access, interfering with platform operations, or using the service for illegal activities.
          </p>
          <h3 className="text-xl font-bold text-white">Intellectual Property</h3>
          <p>
            All content on codeMicro, including text, graphics, logos, and software, is the property of codeMicro Team or its licensors and is protected by intellectual property laws.
          </p>
          <h3 className="text-xl font-bold text-white">Governing Law</h3>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.
          </p>
        </div>
      ),
    },
  };

  const current = content[slug || 'privacy'];

  if (!current) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400">Page not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">{current.title}</h1>
        <article className="prose prose-invert max-w-none">
          {current.body}
        </article>
      </div>
    </div>
  );
}
