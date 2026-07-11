import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useSocket } from '../hooks/useSocket';

export function Sidebar() {
  const { user, logout } = useUser();
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit('user:online', { username: user.username });

    const handleUsersList = (users: string[]) => {
      setOnlineUsers(users.filter(u => u !== user.username));
    };

    socket.on('users:list', handleUsersList);

    return () => {
      socket.off('users:list', handleUsersList);
    };
  }, [socket, user]);

  return (
    <div className="w-64 bg-ink h-screen flex flex-col text-surface p-4 border-r border-ink-muted/20">
      <div className="mb-8">
        <h1 className="font-display font-bold text-xl tracking-tight text-white">Transmission Log</h1>
        <p className="font-mono text-xs text-ink-muted mt-1">Status: <span className="text-pulse">Connected</span></p>
      </div>

      <div className="flex-1">
        <h2 className="font-display text-sm font-semibold text-ink-muted mb-4 uppercase tracking-wider">Signals</h2>
        <ul className="space-y-3">
          {onlineUsers.map((username) => (
            <li key={username} className="flex items-center justify-between">
              <span className="font-body text-sm truncate pr-2">{username}</span>
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-pulse shadow-[0_0_8px_rgba(224,164,88,0.6)]"></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        {/* Current User Widget */}
        <div className="pt-4 border-t border-ink-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-signal flex items-center justify-center text-ink font-bold font-display shadow-md">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <span className="font-body text-sm font-medium truncate max-w-[100px]">{user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="text-[10px] font-display uppercase tracking-wider text-ink-muted hover:text-signal transition-colors p-1"
            title="Log Out"
          >
            [Exit]
          </button>
        </div>
      </div>
    </div>
  );
}
