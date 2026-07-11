import React, { useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useUser } from '../context/UserContext';

interface MessageInputProps {
  onOptimisticSend: (msg: any) => void;
}

export function MessageInput({ onOptimisticSend }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const { socket, isConnected } = useSocket();
  const { user } = useUser();
  const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (socket && isConnected && user) {
      socket.emit('user:typing', { username: user.username });
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('user:stop_typing', { username: user.username });
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socket || !isConnected || !user) return;

    const newMsg = {
      content: message,
      sender: user.username,
      timestamp: new Date().toISOString()
    };

    // Optimistic UI update
    onOptimisticSend(newMsg);

    // Emit to server
    socket.emit('message:send', newMsg);
    
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit('user:stop_typing', { username: user.username });
    
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-canvas border-t border-ink-muted/10 flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder={isConnected ? "Type a message..." : "Connecting..."}
        disabled={!isConnected}
        className="flex-1 bg-surface text-ink border border-ink-muted/20 rounded-md px-4 py-2 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!message.trim() || !isConnected}
        className="bg-signal text-white px-6 py-2 rounded-md font-display font-medium hover:bg-signal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-canvas"
      >
        Send
      </button>
    </form>
  );
}
