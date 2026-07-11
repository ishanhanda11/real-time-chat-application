import React, { useEffect, useState, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useSocket } from '../hooks/useSocket';
import { fetchMessages } from '../services/api';
import { useUser } from '../context/UserContext';

interface Message {
  _id?: string;
  id?: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwnMessage?: boolean;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const { socket } = useSocket();
  const { user } = useUser();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages()
      .then(data => {
        // Handle if backend returns { data: [...] } or just an array
        const msgs = Array.isArray(data) ? data : data.data || [];
        setMessages(msgs.reverse().map((m: any) => ({ ...m, isOwnMessage: m.sender === user?.username })));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleReceive = (message: Message) => {
      setMessages((prev) => {
        // Basic deduplication for optimistic UI
        const exists = prev.find(m => 
          m.content === message.content && 
          m.sender === message.sender &&
          new Date(m.timestamp).getTime() - new Date(message.timestamp).getTime() < 5000
        );
        if (exists && exists.isOwnMessage) {
          // Replace optimistic message with confirmed one from server
          return prev.map(m => m === exists ? { ...message, isOwnMessage: true } : m);
        }
        return [...prev, { ...message, isOwnMessage: message.sender === user?.username }];
      });
    };

    const handleTyping = ({ username }: { username: string }) => {
      setTypingUsers(prev => prev.includes(username) ? prev : [...prev, username]);
    };

    const handleStopTyping = ({ username }: { username: string }) => {
      setTypingUsers(prev => prev.filter(u => u !== username));
    };

    socket.on('message:receive', handleReceive);
    socket.on('user:typing', handleTyping);
    socket.on('user:stop_typing', handleStopTyping);

    return () => {
      socket.off('message:receive', handleReceive);
      socket.off('user:typing', handleTyping);
      socket.off('user:stop_typing', handleStopTyping);
    };
  }, [socket, user?.username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptimisticSend = (msg: Message) => {
    setMessages((prev) => [...prev, { ...msg, id: Date.now().toString(), isOwnMessage: true }]);
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return isNaN(d.getTime()) ? ts : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-canvas">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg._id || msg.id || index}
            content={msg.content}
            timestamp={formatTime(msg.timestamp)}
            isOwnMessage={msg.isOwnMessage || msg.sender === user?.username}
            sender={msg.sender}
          />
        ))}
        {typingUsers.length > 0 && (
          <div className="flex flex-col items-start mb-4">
            <span className="text-xs text-ink-muted mb-1 font-display">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </span>
            <div className="flex items-center gap-1 px-4 py-3 w-max bg-surface border border-ink-muted/10 rounded-lg rounded-bl-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-pulse animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-pulse animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-pulse animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <MessageInput onOptimisticSend={handleOptimisticSend} />
    </div>
  );
}
