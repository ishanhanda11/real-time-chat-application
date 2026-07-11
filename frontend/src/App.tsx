import { ChatWindow } from './components/ChatWindow';
import { Sidebar } from './components/Sidebar';
import { SocketProvider } from './context/SocketContext';

export default function App() {
  return (
    <SocketProvider>
      <main className="min-h-screen bg-canvas font-body text-ink flex">
        <Sidebar />
        <ChatWindow />
      </main>
    </SocketProvider>
  );
}
