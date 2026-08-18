import { Link } from 'react-router-dom';

export function Docs() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
        <p className="text-xl text-gray-400 mb-8">
          Copy-pasteable setup commands and code examples for integrating MCP servers.
        </p>
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
            <p className="text-gray-300 mb-4">
              Add an MCP server to your client configuration. Below are examples for common clients.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Claude Desktop</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`}
              </pre>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 mt-4">
              <h3 className="text-lg font-semibold text-white mb-3">Cursor</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`// .cursor/mcp.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/mydb"
      }
    }
  }
}`}
              </pre>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">TypeScript SDK</h2>
            <p className="text-gray-300 mb-4">
              Use the official TypeScript SDK to build custom MCP clients or servers.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['server.js'],
});

const client = new Client({ name: 'my-client', version: '1.0.0' });
await client.connect(transport);

const tools = await client.listTools();
console.log(tools);`}
              </pre>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Python SDK</h2>
            <p className="text-gray-300 mb-4">
              Build MCP servers in Python with the official SDK.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`from mcp.server import Server
from mcp.types import Tool, TextContent

app = Server("my-server")

@app.tool()
def greet(name: str) -> str:
    """Greet a user by name."""
    return f"Hello, {name}!"`}
              </pre>
            </div>
          </section>
        </div>
        <div className="mt-12">
          <Link
            to="/"
            className="text-brand-cyan hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
