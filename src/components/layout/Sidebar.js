'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import styles from './Sidebar.module.css';

const SECTIONS = [
  {
    label: 'PRINCIPAL',
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
      { id: 'open-delivery', label: 'Open Delivery', path: '/open-delivery', icon: '📦' },
      { id: 'consultas', label: 'Consultas Avanzadas', path: '/consultas', icon: '🔍' },
      { id: 'ordenes-criticas', label: 'Órdenes Críticas', path: '/ordenes-criticas', icon: '⚠️' },
    ]
  },
  {
    label: 'GESTIÓN',
    items: [
      { id: 'calendario', label: 'Tareas y Calendario', path: '/calendario', icon: '📋' },
      // { id: 'responsables', label: 'Responsables', path: '/responsables', icon: '👥' },
      { id: 'exportar', label: 'Reportes y Exportación', path: '/exportar', icon: '📤' },
    ]
  },
  {
    label: 'SISTEMA',
    adminOnly: true,
    items: [
      { id: 'configuracion', label: 'Configuración', path: '/configuracion', icon: '⚙️' },
      { id: 'roles', label: 'Roles y Permisos', path: '/admin/usuarios', icon: '🔐' },
      { id: 'auditoria', label: 'Auditoría', path: '/admin/auditoria', icon: '📜' },
    ]
  }
];

export default function Sidebar({ user, collapsed }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'MANAGER';

  const userRole = user?.role === 'ADMIN' ? 'ADMINISTRADOR' : user?.role === 'MANAGER' ? 'GERENTE' : 'EMPLEADO';

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.roleContainer}>
        {!collapsed ? (
          <span className={styles.roleBadge}>ROL: {userRole}</span>
        ) : (
          <span className={styles.roleBadge} title={`ROL: ${userRole}`}>{userRole[0]}</span>
        )}
      </div>

      <nav className={styles.nav}>
        {SECTIONS.map((section, idx) => {
          if (section.adminOnly && !isAdmin) return null;
          
          return (
            <div key={idx} className={styles.navSection}>
              {!collapsed && <div className={styles.sectionLabel}>{section.label}</div>}
              
              {section.items.map(item => (
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
          );
        })}
      </nav>

      <div className={styles.footer}>
        {!collapsed && <div className={styles.version}>v1.0.0</div>}
        <button className={styles.logoutBtn} onClick={logout} title="Cerrar sesión">
          <span className={styles.navIcon}>🚪</span>
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
