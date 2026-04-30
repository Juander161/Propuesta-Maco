'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function AppLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar user={user} />
      <div style={{ flex: 1, marginLeft: 'var(--sidebar-width)', transition: 'margin 0.25s ease' }}>
        <Navbar user={user} onLogout={handleLogout} />
        <main style={{ padding: '28px 32px', minHeight: 'calc(100vh - var(--navbar-height))' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
