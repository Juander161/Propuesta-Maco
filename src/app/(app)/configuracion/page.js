'use client';
import { useState } from 'react';

const MENU_ITEMS = ['General', 'Integraciones (API)', 'Seguridad y Cifrado', 'Notificaciones'];

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('Seguridad y Cifrado');

  return (
    <div className="flex-col h-full gap-4">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Configuración del Sistema</h1>
          <p className="page-subtitle">Ajustes globales y parámetros de seguridad</p>
        </div>
      </div>

      <div className="flex-row gap-4 h-full" style={{ alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL: Menú */}
        <div className="card flex-col" style={{ flex: 2.5, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', background: '#FAFAFB' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Menú de Configuración
            </span>
          </div>
          <div className="flex-col">
            {MENU_ITEMS.map((item) => (
              <div 
                key={item} 
                onClick={() => setActiveTab(item)}
                style={{ 
                  padding: '16px 20px', 
                  borderBottom: '1px solid var(--border-color)', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeTab === item ? 600 : 400,
                  color: activeTab === item ? 'var(--primary-dark)' : 'var(--text-primary)',
                  borderLeft: activeTab === item ? '4px solid var(--primary-mid)' : '4px solid transparent',
                  background: activeTab === item ? 'var(--primary-light)' : '#fff'
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Área Activa */}
        <div className="card flex-col" style={{ flex: 7.5 }}>
          <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            {activeTab}
          </h3>

          {activeTab === 'Seguridad y Cifrado' && (
            <div className="flex-col gap-4">
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '6px', background: '#FAFAFB' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-dark)' }}>Autenticación de Dos Factores (2FA)</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Requerir código temporal en cada inicio de sesión.</div>
                </div>
                <div style={{ background: 'var(--success)', width: '44px', height: '24px', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ background: '#fff', width: '20px', height: '20px', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '6px', background: '#FAFAFB' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-dark)' }}>Forzar rotación de contraseñas (90 días)</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Exigir cambio de contraseña corporativa periódicamente.</div>
                </div>
                <div style={{ background: 'var(--success)', width: '44px', height: '24px', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ background: '#fff', width: '20px', height: '20px', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '6px', background: '#FAFAFB', opacity: 0.7 }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-dark)' }}>Cifrado de datos en reposo (AES-256)</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Encriptación obligatoria a nivel base de datos. (Gestionado por TI)</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🔒 Obligatorio</span>
                  <div style={{ background: 'var(--success)', width: '44px', height: '24px', borderRadius: '12px', position: 'relative', cursor: 'not-allowed' }}>
                    <div style={{ background: '#fff', width: '20px', height: '20px', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button className="btn btn-primary">Guardar Preferencias</button>
              </div>

            </div>
          )}

          {activeTab !== 'Seguridad y Cifrado' && (
            <div className="empty-state">
              <p>Opciones de {activeTab} se mostrarán aquí.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
