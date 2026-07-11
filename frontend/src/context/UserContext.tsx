import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  _id?: string;
}

interface UserContextProps {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('chat_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username: string) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(errorData.error || 'Login failed');
    }
    const data = await res.json();
    setUser(data);
    localStorage.setItem('chat_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chat_user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
