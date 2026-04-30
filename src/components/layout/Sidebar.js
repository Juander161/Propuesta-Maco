'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { id: 'open-delivery', label: 'Open Delivery', path: '/open-delivery', icon: '📦' },
  { id: 'reglas', label: 'Reglas', path: '/reglas', icon: '⚙️' },
  { id: 'consultas', label: 'Consultas', path: '/consultas', icon: '🔍' },
  { id: 'calendario', label: 'Calendario', path: '/calendario', icon: '📅' },
  { id: 'exportar', label: 'Exportar', path: '/exportar', icon: '📤' },
];

const ADMIN_ITEMS = [
  { id: 'usuarios', label: 'Usuarios', path: '/admin/usuarios', icon: '👥' },
  { id: 'auditoria', label: 'Auditoría', path: '/admin/auditoria', icon: '🛡️' },
];

export default function Sidebar({ user }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>⚡</div>
        {!collapsed && <span className={styles.logoText}>LogísticaPro</span>}
      </div>

      <button className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '→' : '←'}
      </button>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          {!collapsed && <span className={styles.sectionLabel}>Principal</span>}
          {NAV_ITEMS.map(item => (
            <Link
              key={item.id}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
              title={item.label}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            </Link>
          ))}
        </div>

        {isAdmin && (
          <div className={styles.navSection}>
            {!collapsed && <span className={styles.sectionLabel}>Administración</span>}
            {ADMIN_ITEMS.map(item => (
              <Link
                key={item.id}
                href={item.path}
                className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                title={item.label}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {!collapsed && (
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{user?.name?.charAt(0) || 'U'}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.name || 'Usuario'}</div>
            <div className={styles.userRole}>{user?.role || 'EMPLOYEE'}</div>
          </div>
        </div>
      )}
    </aside>
  );
}
