import { useState } from 'react';
import { useTheme } from '../components/ThemeAndAuthProvider';

type Tab = 'login' | 'signup';

export function AuthPage() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <div className="flex rounded-lg bg-white/5 p-1 mb-6">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tab === 'login' ? 'bg-brand-cyan text-brand-bg' : 'text-gray-300 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tab === 'signup' ? 'bg-brand-cyan text-brand-bg' : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
            {tab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-cyan px-6 py-3 font-semibold text-brand-bg hover:bg-brand-cyan/90 transition-colors"
            >
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
