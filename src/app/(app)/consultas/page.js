'use client';
import { useState } from 'react';
import { MOCK_ORDERS } from '@/lib/mockData';

export default function ConsultasPage() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(MOCK_ORDERS);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(MOCK_ORDERS.filter(o => o.id.includes(search) || o.client.toLowerCase().includes(search.toLowerCase())));
      setLoading(false);
    }, 400);
  };

  return (
    <div className="flex-col h-full gap-4">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <h1 className="page-title">Consultas Avanzadas</h1>
      </div>

      <div className="flex-row gap-4 h-full" style={{ alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL: Búsqueda y Filtros */}
        <div className="card" style={{ width: '340px', flexShrink: 0, padding: '20px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Búsqueda Rápida</h3>
            <div className="flex-col gap-2">
              <input 
                type="text" 
                className="input-field" 
                placeholder="ID, Cliente, Producto..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="btn btn-primary w-full" onClick={handleSearch} disabled={loading}>
                {loading ? 'Buscando...' : '🔍 Buscar'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Filtros Globales</h3>
            <div className="flex-col gap-3">
              <div>
                <label className="text-caption" style={{ fontWeight: 600 }}>Cliente</label>
                <select className="input-field" style={{ height: '36px' }}>
                  <option>Todos los clientes</option>
                  <option>Walmart</option>
                  <option>Liverpool</option>
                </select>
              </div>
              <div>
                <label className="text-caption" style={{ fontWeight: 600 }}>Responsable</label>
                <select className="input-field" style={{ height: '36px' }}>
                  <option>Todos</option>
                  <option>María López</option>
                  <option>Carlos Ruiz</option>
                </select>
              </div>
              <div>
                <label className="text-caption" style={{ fontWeight: 600 }}>Estado</label>
                <select className="input-field" style={{ height: '36px' }}>
                  <option>Todos</option>
                  <option>En Proceso</option>
                  <option>Completado</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Historial Reciente</h3>
            <div className="flex-col gap-2">
              <div style={{ fontSize: '13px', color: 'var(--primary-mid)', cursor: 'pointer' }}>🕒 ORD-2026-08399</div>
              <div style={{ fontSize: '13px', color: 'var(--primary-mid)', cursor: 'pointer' }}>🕒 Walmart (Mes actual)</div>
              <div style={{ fontSize: '13px', color: 'var(--primary-mid)', cursor: 'pointer' }}>🕒 Filtro: Shortages</div>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Resultados */}
        <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', background: '#FAFAFB' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary-dark)' }}>
              Resultados: {results.length} órdenes encontradas
            </span>
          </div>
          
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table className="corp-table">
              <thead>
                <tr>
                  <th>ID Orden</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Responsable</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {results.map((order, idx) => (
                  <tr key={idx}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.client}</td>
                    <td>{order.productType}</td>
                    <td>{order.owner}</td>
                    <td>
                      <span className={`badge ${
                        order.status === 'Completado' ? 'badge-green' :
                        order.status === 'En Proceso' ? 'badge-blue' :
                        order.status === 'Shortage' ? 'badge-amber' :
                        order.status === 'Backorder' ? 'badge-red' : 'badge-gray'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        order.priority === 'CRÍTICA' ? 'badge-red' :
                        order.priority === 'ALTA' ? 'badge-amber' : 'badge-gray'
                      }`}>
                        {order.priority}
                      </span>
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No hay resultados</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
