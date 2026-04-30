'use client';
import { useState } from 'react';

const MOCK_HISTORY = [
  { date: '14 Mayo 2026', name: 'Reporte_Shortages_Q1.xlsx', owner: 'María López' },
  { date: '12 Mayo 2026', name: 'Auditoria_Reglas.pdf', owner: 'Carlos Ruiz' },
  { date: '01 Mayo 2026', name: 'Eficiencia_Responsables.csv', owner: 'María López' },
];

export default function ExportarPage() {
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Reporte generado exitosamente. Comenzando descarga...');
    }, 1500);
  };

  return (
    <div className="flex-col h-full gap-4">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Reportes y Exportación</h1>
          <p className="page-subtitle">Generación de archivos e historial de datos</p>
        </div>
      </div>

      <div className="flex-row gap-4 h-full" style={{ alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL: Generador */}
        <div className="card" style={{ flex: 4 }}>
          <h3 style={{ fontSize: '14px', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '20px', textTransform: 'uppercase' }}>
            Generador de Reportes
          </h3>
          
          <div className="flex-col gap-4">
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>Tipo de Reporte</label>
              <select className="input-field">
                <option>Reporte Operativo (Órdenes)</option>
                <option>Auditoría del Sistema</option>
                <option>Eficiencia por Responsable</option>
              </select>
            </div>

            <div className="grid-2">
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>Fecha Inicio</label>
                <input type="date" className="input-field" />
              </div>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>Fecha Fin</label>
                <input type="date" className="input-field" />
              </div>
            </div>

            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>Formato de Salida</label>
              <div className="flex-row gap-4">
                <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="radio" name="format" defaultChecked /> Excel (.xlsx)
                </label>
                <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="radio" name="format" /> PDF (.pdf)
                </label>
                <label style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="radio" name="format" /> CSV (.csv)
                </label>
              </div>
            </div>

            <button className="btn btn-primary w-full" style={{ marginTop: '16px', height: '44px' }} onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generando Reporte...' : '📥 Generar y Descargar'}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Historial */}
        <div className="card" style={{ flex: 6, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', background: '#FAFAFB' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-dark)', textTransform: 'uppercase' }}>
              Historial de Exportaciones
            </span>
          </div>
          
          <table className="corp-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre del Reporte</th>
                <th>Generado Por</th>
                <th style={{ textAlign: 'center' }}>Descargar</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HISTORY.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.owner}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-outlined btn-sm" style={{ padding: '4px 10px', height: 'auto' }}>Descargar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
