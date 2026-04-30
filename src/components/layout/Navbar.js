'use client';
import styles from './Navbar.module.css';

export default function Navbar({ user, onLogout }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <span className={styles.greeting}>
          Buen{now.getHours() < 12 ? 'os días' : now.getHours() < 18 ? 'as tardes' : 'as noches'},{' '}
          <strong>{user?.name?.split(' ')[0] || 'Usuario'}</strong>
        </span>
        <span className={styles.date}>{dateStr}</span>
      </div>
      <div className={styles.right}>
        <div className={styles.liveIndicator}>
          <span className="status-dot online"></span>
          <span>En línea</span>
        </div>
        <button className={`btn btn-secondary btn-sm ${styles.logoutBtn}`} onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
