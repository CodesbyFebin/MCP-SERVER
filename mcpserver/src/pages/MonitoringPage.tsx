import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', latency: 120 },
  { time: '04:00', latency: 98 },
  { time: '08:00', latency: 145 },
  { time: '12:00', latency: 132 },
  { time: '16:00', latency: 110 },
  { time: '20:00', latency: 125 },
  { time: '23:59', latency: 118 },
];

export function MonitoringPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Cluster Health</h1>
        <p className="text-xl text-gray-400 mb-8">
          Real-time monitoring for the codeMicro platform infrastructure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-gray-400 mb-1">Uptime</div>
            <div className="text-3xl font-bold text-brand-green">99.98%</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-gray-400 mb-1">Avg Latency</div>
            <div className="text-3xl font-bold text-brand-cyan">124ms</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-gray-400 mb-1">Active Nodes</div>
            <div className="text-3xl font-bold text-brand-violet">12</div>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Latency (24h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Line type="monotone" dataKey="latency" stroke="#42d7ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
