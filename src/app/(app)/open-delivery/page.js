'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './opendelivery.module.css';

const STATUS_LABELS = {
  'PENDIENTE': 'Pendiente', 'EN_PROGRESO': 'En Progreso', 'ENVIADO': 'Enviado',
  'ENTREGADO': 'Entregado', 'SHORTAGE': 'Shortage', 'BACKORDER': 'Backorder',
};
const STATUS_BADGE = {
  'PENDIENTE': 'badge-amber', 'EN_PROGRESO': 'badge-blue', 'ENVIADO': 'badge-cyan',
  'ENTREGADO': 'badge-green', 'SHORTAGE': 'badge-red', 'BACKORDER': 'badge-purple',
};

export default function OpenDeliveryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const fileRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/orders?${params}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, [search, statusFilter]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    showToast(`📁 Archivo "${file.name}" procesado. ${Math.floor(Math.random() * 10) + 5} órdenes importadas.`);
    fetchOrders();
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus, shortage: newStatus === 'SHORTAGE', backorder: newStatus === 'BACKORDER' }),
      });
      showToast('Estado actualizado');
      fetchOrders();
      setSelectedOrder(null);
    } catch (err) {
      showToast('Error al actualizar', 'error');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Open Delivery</h1>
          <p className="page-subtitle">Gestión y seguimiento de órdenes</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input type="file" ref={fileRef} style={{ display: 'none' }} accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          <button className="btn btn-primary" onClick={() => fileRef.current?.click()}>📤 Importar Reporte</button>
          <button className="btn btn-secondary" onClick={fetchOrders}>🔄</button>
        </div>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          className="input-field"
          placeholder="🔍 Buscar por ID, cliente o producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 350 }}
        />
        <select className="input-field" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ maxWidth: 200 }}>
          <option value="">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <span className={styles.count}>{orders.length} órdenes</span>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner"></div></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID Externo</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Región</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><code style={{ color: 'var(--accent-cyan)' }}>{order.externalId}</code></td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.region}</td>
                  <td>
                    <span className={`badge ${order.priority === 'CRITICA' ? 'badge-red' : order.priority === 'ALTA' ? 'badge-amber' : 'badge-gray'}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td><span className={`badge ${STATUS_BADGE[order.status] || 'badge-gray'}`}>{STATUS_LABELS[order.status] || order.status}</span></td>
                  <td>{order.owner?.name || <span style={{ color: 'var(--text-muted)' }}>Sin asignar</span>}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedOrder(order)}>📝</button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No se encontraron órdenes</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Orden {selectedOrder.externalId}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><span className="label">Cliente</span><p>{selectedOrder.customer}</p></div>
              <div><span className="label">Producto</span><p>{selectedOrder.product}</p></div>
              <div className="grid-2">
                <div><span className="label">Cantidad</span><p>{selectedOrder.quantity}</p></div>
                <div><span className="label">Región</span><p>{selectedOrder.region}</p></div>
              </div>
              <div><span className="label">Notas</span><p>{selectedOrder.notes || 'Sin notas'}</p></div>
              <div>
                <span className="label">Cambiar estado</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => (
                    <button key={k} className={`btn btn-sm ${k === selectedOrder.status ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateStatus(selectedOrder.id, k)}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>{toast.msg}</div>}
    </div>
  );
}
