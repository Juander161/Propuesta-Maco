'use client';
import { useState, useEffect } from 'react';

const ROLE_LABELS = { ADMIN: 'Administrador', MANAGER: 'Gerente', EMPLOYEE: 'Empleado' };
const ROLE_BADGE = { ADMIN: 'badge-red', MANAGER: 'badge-amber', EMPLOYEE: 'badge-blue' };

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(data => { setUsers(data); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Usuarios</h1>
          <p className="page-subtitle">Administración de cuentas y permisos RBAC</p>
        </div>
        <button className="btn btn-primary">+ Nuevo Usuario</button>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner"></div></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Fecha de Creación</th><th>Permisos</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td><span className={`badge ${ROLE_BADGE[u.role]}`}>{ROLE_LABELS[u.role]}</span></td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString('es-MX')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {u.role === 'ADMIN' && <span className="badge badge-green" style={{ fontSize: 10 }}>CRUD Completo</span>}
                      {u.role === 'MANAGER' && <span className="badge badge-cyan" style={{ fontSize: 10 }}>CRU Órdenes</span>}
                      {u.role === 'EMPLOYEE' && <span className="badge badge-gray" style={{ fontSize: 10 }}>RU Órdenes</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
