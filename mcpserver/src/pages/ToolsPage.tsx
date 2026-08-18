import { ProductDemo } from '../components/ProductDemo';

export function ToolsPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Interactive Playground</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl">
          Test MCP JSON-RPC payloads directly in your browser. No server connection required.
        </p>
        <ProductDemo />
        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">How to use</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Enter a valid JSON-RPC request in the left panel.</li>
            <li>Click <strong>Run</strong> to simulate the server response.</li>
            <li>Review the response structure and error codes.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
