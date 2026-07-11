import React from 'react';

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
  sender?: string;
  status?: string;
}

export function MessageBubble({ content, timestamp, isOwnMessage, sender, status }: MessageBubbleProps) {
  return (
    <div className={`flex flex-col mb-4 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
      {!isOwnMessage && sender && (
        <span className="text-xs text-ink-muted mb-1 font-display">{sender}</span>
      )}
      <div
        className={`px-4 py-2 rounded-lg max-w-[80%] ${
          isOwnMessage
            ? 'bg-signal text-white rounded-br-sm'
            : 'bg-surface text-ink border border-ink-muted/10 rounded-bl-sm'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className="font-mono text-[10px] text-ink-muted">{timestamp}</span>
        {isOwnMessage && status && (
          <span className={`text-[10px] font-mono font-bold ${status === 'read' ? 'text-pulse' : 'text-ink-muted'}`}>
            {status === 'sent' && '✓'}
            {status === 'delivered' && '✓✓'}
            {status === 'read' && '✓✓'}
          </span>
        )}
      </div>
    </div>
  );
}
