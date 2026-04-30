'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_ORDERS, MOCK_KPIS } from '@/lib/mockData';
import styles from './dashboard.module.css';

const BAR_DATA = [
  { name: 'María L.', count: 420 },
  { name: 'Carlos R.', count: 380 },
  { name: 'Ana T.', count: 290 },
  { name: 'Luis M.', count: 210 },
  { name: 'Carmen V.', count: 180 },
];

const PIE_DATA = [
  { name: 'En Proceso', value: 7891, color: '#2E75B6' },
  { name: 'Completado', value: 848, color: '#1E7E34' },
  { name: 'Shortage', value: 1203, color: '#E0A800' },
  { name: 'Backorder', value: 342, color: '#C82333' },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network load
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="empty-state"><p>Cargando dashboard...</p></div>;
  }

  return (
    <div className="flex-col gap-4">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Principal</h1>
          <p className="page-subtitle">Resumen general de operaciones y KPIs (Demo Estática)</p>
        </div>
        <button className="btn btn-outlined">
          <span>⬇️</span> Exportar Reporte
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <div className={styles.kpiCard} style={{ borderLeftColor: 'var(--primary-mid)' }}>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>TOTAL ÓRDENES</span>
            <span className={styles.kpiValue}>{MOCK_KPIS.total.toLocaleString()}</span>
          </div>
          <div className={styles.kpiIcon} style={{ background: 'var(--primary-light)', color: 'var(--primary-mid)' }}>📊</div>
        </div>

        <div className={styles.kpiCard} style={{ borderLeftColor: 'var(--success)' }}>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>EN PROCESO</span>
            <span className={styles.kpiValue}>{MOCK_KPIS.enProceso.toLocaleString()}</span>
          </div>
          <div className={styles.kpiIcon} style={{ background: '#D4EDDA', color: 'var(--success)' }}>🔄</div>
        </div>

        <div className={styles.kpiCard} style={{ borderLeftColor: 'var(--warning)' }}>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>SHORTAGES</span>
            <span className={styles.kpiValue}>{MOCK_KPIS.shortage.toLocaleString()}</span>
          </div>
          <div className={styles.kpiIcon} style={{ background: '#FFF3CD', color: 'var(--warning)' }}>⚠️</div>
        </div>

        <div className={styles.kpiCard} style={{ borderLeftColor: 'var(--danger)' }}>
          <div className={styles.kpiInfo}>
            <span className={styles.kpiLabel}>BACKORDERS</span>
            <span className={styles.kpiValue}>{MOCK_KPIS.backorder.toLocaleString()}</span>
          </div>
          <div className={styles.kpiIcon} style={{ background: '#FFDAD9', color: 'var(--danger)' }}>🚨</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Productividad por Responsable</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6C757D' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6C757D' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#F4F6F9' }} contentStyle={{ borderRadius: '8px', border: '1px solid #DEE2E6' }} />
              <Bar dataKey="count" fill="var(--primary-mid)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>Distribución de Estados</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {PIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #DEE2E6' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Órdenes Recientes</h3>
        <table className="corp-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>ID Orden</th>
              <th>Cliente</th>
              <th>Responsable</th>
              <th>F. Ingreso</th>
              <th>F. Entrega</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order, idx) => (
              <tr key={idx}>
                <td><input type="checkbox" /></td>
                <td><strong>{order.id}</strong></td>
                <td>{order.client}</td>
                <td>{order.owner}</td>
                <td>{order.entryDate}</td>
                <td>{order.deliveryDate}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
