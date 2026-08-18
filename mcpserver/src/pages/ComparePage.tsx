import { comparisons } from '../data/comparisons';
import { Link } from 'react-router-dom';

export function ComparePage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Protocol Comparisons</h1>
        <p className="text-xl text-gray-400 mb-12">
          Understand how MCP compares to other API and RPC protocols.
        </p>
        <div className="space-y-16">
          {comparisons.map((comp) => (
            <section key={comp.id} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-bold text-white mb-2">{comp.title}</h2>
              <p className="text-gray-400 mb-6">{comp.description}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-gray-400 font-medium">Criterion</th>
                      <th className="py-3 px-4 text-brand-cyan font-medium">MCP</th>
                      <th className="py-3 px-4 text-gray-400 font-medium">{comp.against}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {comp.criteria.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-4 px-4 text-white font-medium">{row.label}</td>
                        <td className="py-4 px-4 text-gray-300">{row.mcp}</td>
                        <td className="py-4 px-4 text-gray-300">{row.other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-gray-300 italic">{comp.conclusion}</p>
            </section>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/" className="text-brand-cyan hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
