import React from 'react';

// Mock data for UI layout pass
const MOCK_USERS = [
  { id: '1', username: 'Alice', isOnline: true },
  { id: '2', username: 'Bob', isOnline: false },
  { id: '3', username: 'Charlie', isOnline: true },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-ink h-screen flex flex-col text-surface p-4 border-r border-ink-muted/20">
      <div className="mb-8">
        <h1 className="font-display font-bold text-xl tracking-tight text-white">Transmission Log</h1>
        <p className="font-mono text-xs text-ink-muted mt-1">Status: <span className="text-pulse">Connected</span></p>
      </div>

      <div className="flex-1">
        <h2 className="font-display text-sm font-semibold text-ink-muted mb-4 uppercase tracking-wider">Signals</h2>
        <ul className="space-y-3">
          {MOCK_USERS.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <span className="font-body text-sm">{user.username}</span>
              {user.isOnline && (
                <span className="w-2 h-2 rounded-full bg-pulse shadow-[0_0_8px_rgba(224,164,88,0.6)]"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-4 border-t border-ink-muted/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-signal flex items-center justify-center font-display font-bold">
            Y
          </div>
          <div>
            <p className="font-display text-sm font-medium">You</p>
            <p className="font-mono text-[10px] text-ink-muted">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
