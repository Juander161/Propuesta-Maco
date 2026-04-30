'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (preset) => {
    setEmail(preset.email);
    setPassword(preset.password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgOrbs}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>
      <div className={styles.card}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>⚡</div>
          <h1 className={styles.title}>LogísticaPro</h1>
          <p className={styles.subtitle}>Sistema de Gestión de Operaciones</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label className="label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@empresa.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label className="label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={`btn btn-primary btn-lg ${styles.loginBtn}`} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span> : 'Iniciar sesión'}
          </button>
        </form>

        <div className={styles.quickAccess}>
          <p className={styles.quickLabel}>Acceso rápido (demo)</p>
          <div className={styles.quickButtons}>
            <button className={styles.quickBtn} onClick={() => quickLogin({ email: 'admin@logistica.com', password: 'admin123' })}>
              🛡️ Admin
            </button>
            <button className={styles.quickBtn} onClick={() => quickLogin({ email: 'gerente@logistica.com', password: 'manager123' })}>
              📋 Gerente
            </button>
            <button className={styles.quickBtn} onClick={() => quickLogin({ email: 'juan@logistica.com', password: 'employee123' })}>
              👤 Empleado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
