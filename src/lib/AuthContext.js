'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from './mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('logistica_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulated delay
    await new Promise(res => setTimeout(res, 500));
    
    const validUser = MOCK_USERS.find(u => u.email === email);
    // In demo mode, any password works as long as the email is valid, 
    // or we can just accept anything and default to admin if not found.
    const userToLog = validUser || MOCK_USERS[0]; 

    setUser(userToLog);
    localStorage.setItem('logistica_user', JSON.stringify(userToLog));
    return userToLog;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('logistica_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
