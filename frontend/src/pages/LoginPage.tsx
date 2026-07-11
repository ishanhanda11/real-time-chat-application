import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError('');
    try {
      await login(username);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="bg-surface p-8 rounded-lg shadow-sm border border-ink-muted/10 w-full max-w-md">
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Transmission Log</h1>
        <p className="text-ink-muted text-sm mb-6">Enter your callsign to connect to the network.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-ink mb-1">Callsign</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-canvas text-ink border border-ink-muted/20 rounded-md px-4 py-2 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal"
              placeholder="e.g. Maverick"
              disabled={loading}
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={!username.trim() || loading}
            className="w-full bg-signal text-white py-2 rounded-md font-display font-medium hover:bg-signal/90 disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2"
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </form>
      </div>
    </div>
  );
}
