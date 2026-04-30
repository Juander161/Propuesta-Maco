'use client';
import { useState } from 'react';
import { MOCK_TASKS } from '@/lib/mockData';
import styles from './calendario.module.css';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
// Helper for demo purposes to generate a simple grid
const generateDays = () => Array.from({ length: 35 }, (_, i) => i - 2); // 35 boxes for 5 weeks

export default function CalendarioPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-col h-full gap-4">
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Gestión de Tareas y Calendario</h1>
          <p className="page-subtitle">Planificación de actividades</p>
        </div>
      </div>

      <div className="flex-row gap-4 h-full" style={{ alignItems: 'flex-start' }}>
        
        {/* LEFT PANEL: Calendario Interactivo */}
        <div className="card" style={{ flex: 6.5, display: 'flex', flexDirection: 'column' }}>
          <div className="flex-row justify-between items-center" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--primary-dark)', fontWeight: 700 }}>Mayo 2026</h3>
            <div className="flex-row gap-2">
              <button className="btn btn-outlined btn-sm" style={{ padding: '0 12px' }}>←</button>
              <button className="btn btn-outlined btn-sm" style={{ padding: '0 12px' }}>Hoy</button>
              <button className="btn btn-outlined btn-sm" style={{ padding: '0 12px' }}>→</button>
            </div>
          </div>

          <div className={styles.calGrid}>
            {DAYS.map((d, i) => (
              <div key={i} className={styles.calDayHeader}>{d}</div>
            ))}
            
            {generateDays().map((dayNum, i) => {
              const isCurrentMonth = dayNum > 0 && dayNum <= 31;
              const displayNum = isCurrentMonth ? dayNum : (dayNum <= 0 ? 30 + dayNum : dayNum - 31);
              const isToday = dayNum === 14; // Fake today
              
              // Fake task dots
              const hasAlert = dayNum === 15 || dayNum === 22;
              const hasSuccess = dayNum === 10 || dayNum === 14;

              return (
                <div key={i} className={`${styles.calCell} ${!isCurrentMonth ? styles.calCellDim : ''} ${isToday ? styles.calCellToday : ''}`}>
                  <span className={styles.calDateNum}>{displayNum}</span>
                  <div className={styles.calDots}>
                    {hasAlert && <span className={styles.dotAlert}></span>}
                    {hasSuccess && <span className={styles.dotSuccess}></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Lista de Tareas */}
        <div className="card" style={{ flex: 3.5, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '20px' }}>
            Tareas Pendientes (Próximos 3 días)
          </h3>
          
          <div className="flex-col gap-3" style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
            {tasks.map((task) => (
              <div key={task.id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', background: '#FAFAFB' }}>
                <div className="flex-row justify-between items-center" style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-dark)' }}>{task.title}</span>
                  <span className={`badge ${
                    task.priority === 'ALTA' ? 'badge-red' :
                    task.priority === 'MEDIA' ? 'badge-amber' : 'badge-gray'
                  }`}>{task.priority}</span>
                </div>
                <div className="flex-row items-center gap-4" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span>📅 {task.date} {task.time}</span>
                  <span>👤 {task.owner}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-outlined w-full" onClick={() => setShowForm(true)}>+ Nueva Tarea</button>
        </div>

      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="card" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Nueva Tarea</h2>
            <div className="flex-col gap-3">
              <input type="text" className="input-field" placeholder="Título de la tarea" />
              <select className="input-field">
                <option>Prioridad ALTA</option>
                <option>Prioridad MEDIA</option>
                <option>Prioridad BAJA</option>
              </select>
              <input type="date" className="input-field" />
              <button className="btn btn-primary" onClick={() => setShowForm(false)}>Guardar Tarea</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
