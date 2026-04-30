'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import styles from './calendario.module.css';

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function CalendarioPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', emailAlert: false });
  const [toast, setToast] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    setTasks(await res.json());
  };
  useEffect(() => { fetchTasks(); }, []);

  const showToastMsg = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId: user.id, dueDate: new Date(form.dueDate).toISOString() }),
      });
      showToastMsg('Tarea creada');
      setShowForm(false);
      setForm({ title: '', description: '', dueDate: '', emailAlert: false });
      fetchTasks();
    } catch { showToastMsg('Error', 'error'); }
  };

  const toggleTask = async (task) => {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task.id, completed: !task.completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch('/api/tasks', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchTasks();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const getTasksForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate.startsWith(dateStr));
  };

  const navigate = (dir) => {
    const d = new Date(year, month + dir, 1);
    setCurrentDate(d);
  };

  const upcoming = tasks.filter(t => !t.completed && new Date(t.dueDate) >= new Date()).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Calendario</h1>
          <p className="page-subtitle">Planificación de actividades y recordatorios</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Nueva Tarea</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div className="glass-card">
          <div className={styles.calHeader}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>←</button>
            <h3 className={styles.calMonth}>{MONTHS[month]} {year}</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate(1)}>→</button>
          </div>

          <div className={styles.calGrid}>
            {DAYS.map(d => <div key={d} className={styles.calDayHeader}>{d}</div>)}
            {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} className={styles.calDay}></div>)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayTasks = getTasksForDay(day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              return (
                <div key={day} className={`${styles.calDay} ${isToday ? styles.today : ''} ${dayTasks.length > 0 ? styles.hasTask : ''}`}>
                  <span className={styles.dayNum}>{day}</span>
                  {dayTasks.slice(0, 2).map(t => (
                    <div key={t.id} className={styles.taskDot} title={t.title} style={{ background: t.completed ? 'var(--accent-green)' : 'var(--accent-blue)' }}></div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass-card">
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>📋 Próximas Tareas</h3>
            {upcoming.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t)} style={{ accentColor: 'var(--accent-blue)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(t.dueDate).toLocaleDateString('es-MX')}{t.emailAlert ? ' 📧' : ''}</div>
                </div>
                <button className="btn btn-sm" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }} onClick={() => deleteTask(t.id)}>🗑️</button>
              </div>
            ))}
            {upcoming.length === 0 && <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>Sin tareas pendientes</p>}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nueva Tarea</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label className="label">Título</label><input className="input-field" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
              <div><label className="label">Descripción</label><textarea className="input-field" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
              <div><label className="label">Fecha límite</label><input type="date" className="input-field" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.emailAlert} onChange={e => setForm({ ...form, emailAlert: e.target.checked })} style={{ accentColor: 'var(--accent-blue)' }} />
                Enviar alerta por correo electrónico
              </label>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Crear Tarea</button>
            </form>
          </div>
        </div>
      )}
      {toast && <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>{toast.msg}</div>}
    </div>
  );
}
