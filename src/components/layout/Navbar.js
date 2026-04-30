'use client';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const BREADCRUMBS = {
  '/dashboard': 'Dashboard Principal',
  '/open-delivery': 'Open Delivery',
  '/reglas': 'Motor de Reglas',
  '/consultas': 'Consultas Avanzadas',
  '/calendario': 'Tareas y Calendario',
  '/exportar': 'Reportes y Exportación',
  '/admin/usuarios': 'Roles y Permisos',
  '/admin/auditoria': 'Auditoría del Sistema',
};

export default function Navbar({ user, toggleSidebar }) {
  const pathname = usePathname();
  const currentModule = BREADCRUMBS[pathname] || 'Dashboard Principal';
  
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2) : 'US';

  return (
    <header className={styles.navbar}>
      <div className={styles.leftGroup}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          ☰
        </button>
        <div className={styles.logoSquare}>OL</div>
        <span className={styles.appName}>OpsLogistics</span>
        <div className={styles.separator}></div>
        <span className={styles.breadcrumb}>{currentModule}</span>
      </div>

      <div className={styles.centerGroup}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Buscar orden, responsable..." />
          <span className={styles.shortcut}>⌘K</span>
        </div>
      </div>

      <div className={styles.rightGroup}>
        <button className={styles.iconBtn}>
          📅
          <span className={`${styles.iconBadge} ${styles.badgeAmber}`}>3</span>
        </button>
        <button className={styles.iconBtn}>
          🔔
          <span className={`${styles.iconBadge} ${styles.badgeRed}`}>7</span>
        </button>
        <button className={styles.iconBtn}>
          ✉️
          <span className={`${styles.iconBadge} ${styles.badgeBlue}`}>2</span>
        </button>
        
        <div className={styles.separator}></div>
        
        <div className={styles.userSection}>
          <div className={styles.avatar}>{initials}</div>
          <span className={styles.userName}>{user?.name || 'Usuario'}</span>
          <span className={styles.chevron}>▼</span>
        </div>
      </div>
    </header>
  );
}
