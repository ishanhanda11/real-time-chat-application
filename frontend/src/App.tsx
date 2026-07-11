import { UserProvider, useUser } from './context/UserContext';
import { LoginPage } from './pages/LoginPage';
import { ChatPage } from './pages/ChatPage';

const AppContent = () => {
  const { user } = useUser();
  return user ? <ChatPage /> : <LoginPage />;
};

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
