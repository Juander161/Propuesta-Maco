'use client';
import { useState } from 'react';

export default function ConsultasPage() {
  const [searchId, setSearchId] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const search = async () => {
    if (!searchId.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?search=${encodeURIComponent(searchId)}`);
      const data = await res.json();
      setResults(data);
      setHistory(prev => [searchId, ...prev.filter(h => h !== searchId)].slice(0, 10));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const STATUS_LABELS = {
    'PENDIENTE': 'Pendiente', 'EN_PROGRESO': 'En Progreso', 'ENVIADO': 'Enviado',
    'ENTREGADO': 'Entregado', 'SHORTAGE': 'Shortage', 'BACKORDER': 'Backorder',
  };
  const STATUS_BADGE = {
    'PENDIENTE': 'badge-amber', 'EN_PROGRESO': 'badge-blue', 'ENVIADO': 'badge-cyan',
    'ENTREGADO': 'badge-green', 'SHORTAGE': 'badge-red', 'BACKORDER': 'badge-purple',
  };

  const anomalies = results.filter(o => o.backorder || o.shortage);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Consultas Avanzadas</h1>
          <p className="page-subtitle">Espacio de trabajo multi-consulta</p>
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <label className="label">Buscar orden por ID, cliente o producto</label>
            <input className="input-field" value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Ej: OD-2026-0001, Walmart, Producto A-100" onKeyDown={e => e.key === 'Enter' && search()} />
          </div>
          <button className="btn btn-primary" onClick={search} disabled={loading}>
            {loading ? '⏳' : '🔍'} Buscar
          </button>
        </div>

        {history.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', alignSelf: 'center' }}>Recientes:</span>
            {history.map(h => (
              <button key={h} className="btn btn-secondary btn-sm" style={{ fontSize: 11 }} onClick={() => { setSearchId(h); }}>
                {h}
              </button>
            ))}
          </div>
        )}
      </div>

      {anomalies.length > 0 && (
        <div className="glass-card" style={{ marginBottom: 24, borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <h3 style={{ color: 'var(--accent-red)', marginBottom: 12, fontSize: 15, fontWeight: 600 }}>⚠️ Anomalías Detectadas ({anomalies.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {anomalies.map(o => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                <code style={{ color: 'var(--accent-cyan)' }}>{o.externalId}</code>
                <span>{o.customer}</span>
                <span className={`badge ${o.backorder ? 'badge-purple' : 'badge-red'}`}>{o.backorder ? 'Backorder' : 'Shortage'}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>📧 Notificación pendiente</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Cliente</th><th>Producto</th><th>Cant.</th><th>Región</th><th>Estado</th><th>Responsable</th></tr>
            </thead>
            <tbody>
              {results.map(o => (
                <tr key={o.id}>
                  <td><code style={{ color: 'var(--accent-cyan)' }}>{o.externalId}</code></td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td>{o.quantity}</td>
                  <td>{o.region}</td>
                  <td><span className={`badge ${STATUS_BADGE[o.status] || 'badge-gray'}`}>{STATUS_LABELS[o.status] || o.status}</span></td>
                  <td>{o.owner?.name || 'Sin asignar'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && results.length === 0 && searchId && (
        <div className="glass-card empty-state"><p>No se encontraron resultados para "{searchId}"</p></div>
      )}
    </div>
  );
}
