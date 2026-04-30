'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './dashboard.module.css';

const STATUS_COLORS = {
  'PENDIENTE': '#f59e0b', 'EN_PROGRESO': '#3b82f6', 'ENVIADO': '#06b6d4',
  'ENTREGADO': '#10b981', 'SHORTAGE': '#ef4444', 'BACKORDER': '#8b5cf6',
};
const PIE_COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const STATUS_LABELS = {
  'PENDIENTE': 'Pendiente', 'EN_PROGRESO': 'En Progreso', 'ENVIADO': 'Enviado',
  'ENTREGADO': 'Entregado', 'SHORTAGE': 'Shortage', 'BACKORDER': 'Backorder',
};

const PRIORITY_LABELS = {
  'BAJA': 'Baja', 'NORMAL': 'Normal', 'ALTA': 'Alta', 'CRITICA': 'Crítica',
};

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner"></div></div>;

  const statusData = (data?.statusBreakdown || []).map(s => ({
    name: STATUS_LABELS[s.status] || s.status,
    value: s.count,
    color: STATUS_COLORS[s.status] || '#64748b',
  }));

  const priorityData = (data?.priorityBreakdown || []).map(p => ({
    name: PRIORITY_LABELS[p.priority] || p.priority,
    value: p.count,
  }));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Resumen de operaciones en tiempo real</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchData}>🔄 Actualizar</button>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="kpi-card blue">
          <div className="kpi-value">{data?.totalOrders || 0}</div>
          <div className="kpi-label">Total Órdenes</div>
        </div>
        <div className="kpi-card amber">
          <div className="kpi-value">{data?.pendingCount || 0}</div>
          <div className="kpi-label">Pendientes</div>
        </div>
        <div className="kpi-card purple" style={{ cursor: 'default' }}>
          <div className="kpi-value" style={{ background: 'linear-gradient(135deg, #ef4444, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {data?.shortageCount || 0}
          </div>
          <div className="kpi-label">Shortage</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-value" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {data?.backorderCount || 0}
          </div>
          <div className="kpi-label">Backorder</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 28 }}>
        <div className="glass-card">
          <h3 className={styles.chartTitle}>Órdenes por Estado</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1a2035', border: '1px solid rgba(148,163,184,0.1)', borderRadius: 10, color: '#f1f5f9' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card">
          <h3 className={styles.chartTitle}>Distribución por Responsable</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data?.distribution || []} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={3} label={({ name, count }) => `${name} (${count})`}>
                {(data?.distribution || []).map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a2035', border: '1px solid rgba(148,163,184,0.1)', borderRadius: 10, color: '#f1f5f9' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card">
        <h3 className={styles.chartTitle}>
          🔴 Órdenes Críticas
          <span className="badge badge-red" style={{ marginLeft: 8 }}>{data?.criticalOrders?.length || 0}</span>
        </h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {(data?.criticalOrders || []).map(order => (
              <tr key={order.id}>
                <td><span style={{ fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>{order.externalId}</span></td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>
                  <span className={`badge ${order.priority === 'CRITICA' ? 'badge-red' : 'badge-amber'}`}>
                    {PRIORITY_LABELS[order.priority] || order.priority}
                  </span>
                </td>
                <td>
                  <span className={`badge ${order.status === 'SHORTAGE' ? 'badge-red' : order.status === 'BACKORDER' ? 'badge-purple' : 'badge-blue'}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </td>
                <td>{order.owner?.name || 'Sin asignar'}</td>
              </tr>
            ))}
            {(!data?.criticalOrders || data.criticalOrders.length === 0) && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)' }}>Sin órdenes críticas 🎉</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
