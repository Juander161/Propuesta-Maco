'use client';
import { MOCK_ORDERS } from '@/lib/mockData';

export default function OrdenesCriticasPage() {
  const shortages = MOCK_ORDERS.filter(o => o.status === 'Shortage');
  const backorders = MOCK_ORDERS.filter(o => o.status === 'Backorder');

  return (
    <div className="flex-col h-full gap-4">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Órdenes Críticas</h1>
          <p className="page-subtitle">Atención Requerida</p>
        </div>
      </div>

      <div className="flex-row gap-4 h-full" style={{ alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL: Shortages */}
        <div className="flex-col flex-1 gap-3">
          <div style={{ background: '#FFF3CD', borderLeft: '4px solid var(--warning)', padding: '16px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#856404' }}>SHORTAGES ACTIVOS ({shortages.length})</span>
            <button className="btn btn-sm" style={{ background: '#fff', border: '1px solid var(--warning)', color: '#856404' }}>Notificar a todos</button>
          </div>
          
          <div className="flex-col gap-3" style={{ overflowY: 'auto' }}>
            {shortages.map((order, idx) => (
              <div key={idx} className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="flex-row items-center gap-2" style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{order.id}</span>
                    <span className="badge badge-amber">Próximo a Vencer</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Cliente: {order.client} | Responsable: {order.owner}</div>
                </div>
                <button className="btn btn-outlined btn-sm">Ver Detalle</button>
              </div>
            ))}
            {shortages.length === 0 && <div className="card text-center" style={{ padding: 40, color: 'var(--text-secondary)' }}>No hay shortages activos.</div>}
          </div>
        </div>

        {/* RIGHT PANEL: Backorders */}
        <div className="flex-col flex-1 gap-3">
          <div style={{ background: '#FFDAD9', borderLeft: '4px solid var(--danger)', padding: '16px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#721c24' }}>BACKORDERS VENCIDOS ({backorders.length})</span>
            <button className="btn btn-sm" style={{ background: '#fff', border: '1px solid var(--danger)', color: '#721c24' }}>Escalar reporte</button>
          </div>
          
          <div className="flex-col gap-3" style={{ overflowY: 'auto' }}>
            {backorders.map((order, idx) => (
              <div key={idx} className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="flex-row items-center gap-2" style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{order.id}</span>
                    <span className="badge badge-red">Crítico</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Cliente: {order.client} | Responsable: {order.owner}</div>
                </div>
                <button className="btn btn-danger btn-sm">Resolución</button>
              </div>
            ))}
            {backorders.length === 0 && <div className="card text-center" style={{ padding: 40, color: 'var(--text-secondary)' }}>No hay backorders vencidos.</div>}
          </div>
        </div>

      </div>
    </div>
  );
}
