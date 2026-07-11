import { ChatWindow } from './components/ChatWindow';
import { Sidebar } from './components/Sidebar';

export default function App() {
  return (
    <main className="min-h-screen bg-canvas font-body text-ink flex">
      <Sidebar />
      <ChatWindow />
    </main>
  );
}
