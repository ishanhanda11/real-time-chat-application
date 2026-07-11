import React from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

// Mock data for UI layout pass
const MOCK_MESSAGES = [
  { id: '1', sender: 'Alice', content: 'Hello there!', timestamp: '14:30:00', isOwnMessage: false },
  { id: '2', sender: 'You', content: 'Hi Alice, how are you?', timestamp: '14:30:45', isOwnMessage: true },
  { id: '3', sender: 'Alice', content: 'I am doing great! Working on the frontend layout right now.', timestamp: '14:31:10', isOwnMessage: false },
  { id: '4', sender: 'You', content: 'Awesome, the log-style timestamps are looking good.', timestamp: '14:32:07', isOwnMessage: true },
];

export function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col h-screen bg-canvas">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {MOCK_MESSAGES.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            timestamp={msg.timestamp}
            isOwnMessage={msg.isOwnMessage}
            sender={msg.sender}
          />
        ))}
        {/* Typing indicator placeholder */}
        <div className="flex items-center gap-1 mt-2 mb-4 px-4 py-2 w-max bg-surface border border-ink-muted/10 rounded-lg rounded-bl-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-pulse animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-pulse animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-pulse animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
      <MessageInput />
    </div>
  );
}
