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
    <div className={styles.splitLayout}>
      {/* LEFT HALF */}
      <div className={styles.leftHalf}>
        <div className={styles.branding}>
          <div className={styles.logoBox}>
            <span>CS</span>
          </div>
          <h1 className={styles.appName}>OpsLogistics</h1>
          <p className={styles.tagline}>
            Sistema de Gestión y Automatización de Operaciones Logísticas
          </p>
          <div className={styles.decorativeLines}>
            <div style={{ width: '40px' }}></div>
            <div style={{ width: '60px' }}></div>
            <div style={{ width: '30px' }}></div>
          </div>
        </div>
        <div className={styles.versionLabel}>
          v1.0.0 — Customer Service Dept.
        </div>
      </div>

      {/* RIGHT HALF */}
      <div className={styles.rightHalf}>
        <div className={styles.loginCard}>
          <div className={styles.sectionLabel}>BIENVENIDO</div>
          <h2 className={styles.cardTitle}>Iniciar Sesión</h2>
          <p className={styles.cardSubtitle}>
            Ingresa tus credenciales corporativas para continuar.
          </p>

          <hr className={styles.divider} />

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.field}>
              <label htmlFor="email">Usuario / Correo corporativo</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉️</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  required
                />
              </div>
            </div>

            <div className={styles.field} style={{ marginTop: '20px' }}>
              <label htmlFor="password">Contraseña</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <span className={styles.inputIconRight}>👁️</span>
              </div>
            </div>

            <div className={styles.row}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> Recordar sesión
              </label>
              <a href="#" className={styles.link}>¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar al Sistema →'}
            </button>

            <div className={styles.orDivider}>
              <span>o continúa con</span>
            </div>

            <button type="button" className={styles.ssoBtn}>
              <span className={styles.ssoIcon}>MS</span>
              Iniciar con cuenta Microsoft
            </button>

            {/* Quick access for demo purposes */}
            <div className={styles.quickAccess}>
              <p>Accesos rápidos (Demo):</p>
              <div className={styles.quickRow}>
                <button type="button" onClick={() => quickLogin({email: 'admin@logistica.com', password: '123'})}>Admin</button>
                <button type="button" onClick={() => quickLogin({email: 'gerente@logistica.com', password: '123'})}>Gerente</button>
                <button type="button" onClick={() => quickLogin({email: 'ana@logistica.com', password: '123'})}>Empleado</button>
              </div>
            </div>
          </form>
        </div>
        
        <div className={styles.footerText}>
          Acceso restringido a personal autorizado.
        </div>
      </div>
    </div>
  );
}
