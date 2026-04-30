'use client';
import { useState } from 'react';
import { MOCK_USERS } from '@/lib/mockData';

export default function UsuariosPage() {
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[2]); // Ana Torres by default

  return (
    <div className="flex-col h-full gap-4">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Roles y Permisos</h1>
          <p className="page-subtitle">Gestión de accesos de usuarios del sistema</p>
        </div>
        <button className="btn btn-primary">+ Nuevo Usuario</button>
      </div>

      <div className="flex-row gap-4 h-full" style={{ alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL: Lista de Usuarios */}
        <div className="card flex-col" style={{ flex: 3.5, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', background: '#FAFAFB' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Directorio de Usuarios
            </span>
          </div>
          <div style={{ overflowY: 'auto' }}>
            {MOCK_USERS.map((user) => (
              <div 
                key={user.id} 
                onClick={() => setSelectedUser(user)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', 
                  borderBottom: '1px solid var(--border-color)', cursor: 'pointer',
                  background: selectedUser.id === user.id ? 'var(--primary-light)' : '#fff'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: user.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>
                  {user.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Matriz de Permisos */}
        <div className="card" style={{ flex: 6.5 }}>
          <div className="flex-row justify-between items-center" style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: 'var(--primary-dark)', fontWeight: 600 }}>
                Editando permisos para: <span style={{ color: 'var(--primary-mid)' }}>{selectedUser.name}</span>
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedUser.email} — Rol asignado: {selectedUser.role}</p>
            </div>
            <button className="btn btn-primary">Guardar Cambios</button>
          </div>

          <div className="grid-2">
            
            {/* Seccion Permisos */}
            <div className="flex-col gap-4">
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Módulo: Dashboard</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked /> Ver KPIs Generales
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked={selectedUser.role !== 'EMPLOYEE'} /> Ver Gráficas de Productividad
              </label>

              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginTop: '16px' }}>Módulo: Open Delivery</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked /> Sincronizar Manualmente
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked={selectedUser.role !== 'EMPLOYEE'} /> Editar Motor de Reglas
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked={selectedUser.role === 'ADMIN'} /> Eliminar Órdenes
              </label>
            </div>

            {/* Seccion Permisos */}
            <div className="flex-col gap-4">
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Módulo: Configuración</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked={selectedUser.role === 'ADMIN'} /> Modificar Roles
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked={selectedUser.role === 'ADMIN'} /> Ver Log de Auditoría
              </label>

              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginTop: '16px' }}>Módulo: Reportes</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked /> Exportar Excel/CSV
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input type="checkbox" defaultChecked={selectedUser.role !== 'EMPLOYEE'} /> Exportar Auditoría de Sistema
              </label>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
