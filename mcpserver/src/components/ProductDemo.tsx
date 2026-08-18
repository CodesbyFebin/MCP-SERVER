import { useState } from 'react';

export function ProductDemo() {
  const [input, setInput] = useState('{\n  "method": "tools/call",\n  "params": {\n    "name": "list_servers"\n  }\n}');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify({
        jsonrpc: '2.0',
        id: parsed.id || 1,
        result: {
          tools: [
            { name: 'list_servers', description: 'List all available MCP servers' },
            { name: 'get_server', description: 'Get details for a specific server' },
          ],
        },
      }, null, 2));
    } catch {
      setOutput('// Invalid JSON input');
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">JSON-RPC Playground</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Request</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 rounded-lg bg-brand-bg border border-white/10 p-4 text-sm font-mono text-gray-300 focus:outline-none focus:border-brand-cyan"
            spellCheck={false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Response</label>
          <pre className="w-full h-64 rounded-lg bg-brand-bg border border-white/10 p-4 text-sm font-mono text-brand-green overflow-auto">
            {output || '// Click "Run" to see the response'}
          </pre>
        </div>
      </div>
      <button
        onClick={handleRun}
        className="mt-4 rounded-lg bg-brand-cyan px-6 py-2 font-semibold text-brand-bg hover:bg-brand-cyan/90 transition-colors"
      >
        Run
      </button>
    </div>
  );
}
