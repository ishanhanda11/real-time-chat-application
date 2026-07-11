import React, { useEffect, useState, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useSocket } from '../hooks/useSocket';
import { fetchMessages } from '../services/api';

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
  const { socket } = useSocket();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages()
      .then(data => {
        // Handle if backend returns { data: [...] } or just an array
        const msgs = Array.isArray(data) ? data : data.data || [];
        setMessages(msgs.reverse().map((m: any) => ({ ...m, isOwnMessage: m.sender === 'You' })));
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
        return [...prev, { ...message, isOwnMessage: message.sender === 'You' }];
      });
    };

    socket.on('message:receive', handleReceive);

    return () => {
      socket.off('message:receive', handleReceive);
    };
  }, [socket]);

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
            isOwnMessage={msg.isOwnMessage || msg.sender === 'You'}
            sender={msg.sender}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <MessageInput onOptimisticSend={handleOptimisticSend} />
    </div>
  );
}
