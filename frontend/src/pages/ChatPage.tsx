import React from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { Sidebar } from '../components/Sidebar';
import { SocketProvider } from '../context/SocketContext';

export function ChatPage() {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-canvas font-body text-ink flex">
        <Sidebar />
        <ChatWindow />
      </div>
    </SocketProvider>
  );
}
