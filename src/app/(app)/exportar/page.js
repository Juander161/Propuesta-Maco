'use client';
import { useState } from 'react';

export default function ExportarPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToastMsg = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const exportToExcel = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders`);
      const orders = await res.json();

      // Generate CSV as a simple export
      const headers = ['ID Externo', 'Cliente', 'Producto', 'Cantidad', 'Región', 'Estado', 'Prioridad', 'Responsable', 'Shortage', 'Backorder'];
      const rows = orders.map(o => [
        o.externalId, o.customer, o.product, o.quantity, o.region, o.status, o.priority, o.owner?.name || '', o.shortage ? 'Sí' : 'No', o.backorder ? 'Sí' : 'No'
      ]);

      const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ordenes_${type}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      showToastMsg(`Exportación "${type}" completada (${orders.length} registros)`);
    } catch {
      showToastMsg('Error al exportar', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Exportar Datos</h1>
          <p className="page-subtitle">Genera reportes y comparte información</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="glass-card" style={{ textAlign: 'center', padding: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Reporte General</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Todas las órdenes con sus datos completos</p>
          <button className="btn btn-primary" onClick={() => exportToExcel('general')} disabled={loading}>
            {loading ? '⏳' : '📤'} Exportar CSV
          </button>
        </div>

        <div className="glass-card" style={{ textAlign: 'center', padding: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Reporte de Anomalías</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Órdenes con Shortage y Backorder</p>
          <button className="btn btn-primary" style={{ background: 'var(--gradient-danger)' }} onClick={() => exportToExcel('anomalias')} disabled={loading}>
            {loading ? '⏳' : '📤'} Exportar CSV
          </button>
        </div>

        <div className="glass-card" style={{ textAlign: 'center', padding: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
          <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Enviar por Correo</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Envía reporte a colaboradores externos</p>
          <button className="btn btn-secondary" onClick={() => showToastMsg('📧 Función de envío por correo disponible próximamente')}>
            Configurar envío
          </button>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>{toast.msg}</div>}
    </div>
  );
}
