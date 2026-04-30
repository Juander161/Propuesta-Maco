'use client';

export default function AuditoriaPage() {
  const logs = [
    { id: 1, action: 'LOGIN', entity: 'User', user: 'Carlos Admin', details: 'Inicio de sesión exitoso', time: 'Hace 5 min' },
    { id: 2, action: 'UPDATE', entity: 'Order', user: 'María García', details: 'Cambió estado OD-2026-0012 a ENVIADO', time: 'Hace 15 min' },
    { id: 3, action: 'CREATE', entity: 'Task', user: 'Juan López', details: 'Creó tarea: Revisar órdenes pendientes', time: 'Hace 1 hora' },
    { id: 4, action: 'UPDATE', entity: 'Rule', user: 'Carlos Admin', details: 'Desactivó regla: Región Norte → Juan', time: 'Hace 2 horas' },
    { id: 5, action: 'EXPORT', entity: 'Report', user: 'María García', details: 'Exportó reporte general CSV', time: 'Hace 3 horas' },
    { id: 6, action: 'LOGIN', entity: 'User', user: 'Ana Martínez', details: 'Inicio de sesión exitoso', time: 'Hace 4 horas' },
    { id: 7, action: 'UPDATE', entity: 'Order', user: 'Juan López', details: 'Cambió estado OD-2026-0003 a SHORTAGE', time: 'Hace 5 horas' },
    { id: 8, action: 'DELETE', entity: 'Task', user: 'Carlos Admin', details: 'Eliminó tarea: Reporte semanal', time: 'Ayer' },
  ];

  const ACTION_BADGE = {
    LOGIN: 'badge-green', CREATE: 'badge-blue', UPDATE: 'badge-amber', DELETE: 'badge-red', EXPORT: 'badge-purple',
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Auditoría</h1>
          <p className="page-subtitle">Registro de actividad del sistema</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr><th>Acción</th><th>Entidad</th><th>Usuario</th><th>Detalles</th><th>Tiempo</th></tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td><span className={`badge ${ACTION_BADGE[log.action]}`}>{log.action}</span></td>
                <td>{log.entity}</td>
                <td style={{ fontWeight: 500 }}>{log.user}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{log.details}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
