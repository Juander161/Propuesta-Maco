'use client';
import { useState, useEffect } from 'react';

const FIELDS = [
  { value: 'customer', label: 'Cliente' }, { value: 'region', label: 'Región' },
  { value: 'product', label: 'Producto' }, { value: 'quantity', label: 'Cantidad' },
  { value: 'priority', label: 'Prioridad' },
];
const OPERATORS = [
  { value: 'equals', label: 'Es igual a' }, { value: 'contains', label: 'Contiene' },
  { value: 'startsWith', label: 'Empieza con' }, { value: 'greaterThan', label: 'Mayor que' },
  { value: 'lessThan', label: 'Menor que' },
];

export default function ReglasPage() {
  const [rules, setRules] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', field: 'customer', operator: 'equals', value: '', assignTo: '', priority: 0, active: true });
  const [toast, setToast] = useState(null);

  const fetchRules = async () => { const res = await fetch('/api/rules'); setRules(await res.json()); };
  const fetchUsers = async () => { const res = await fetch('/api/users'); setUsers(await res.json()); };

  useEffect(() => { fetchRules(); fetchUsers(); }, []);

  const showToastMsg = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/rules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, priority: Number(form.priority) }) });
      showToastMsg('Regla creada exitosamente');
      setShowForm(false);
      setForm({ name: '', field: 'customer', operator: 'equals', value: '', assignTo: '', priority: 0, active: true });
      fetchRules();
    } catch { showToastMsg('Error al crear regla', 'error'); }
  };

  const toggleRule = async (rule) => {
    await fetch('/api/rules', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: rule.id, active: !rule.active }) });
    fetchRules();
  };

  const deleteRule = async (id) => {
    await fetch('/api/rules', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    showToastMsg('Regla eliminada');
    fetchRules();
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Motor de Reglas</h1>
          <p className="page-subtitle">Asignación automática de responsables</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Nueva Regla</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rules.map(rule => (
          <div key={rule.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', opacity: rule.active ? 1 : 0.5 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{rule.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Si <span className="badge badge-cyan">{FIELDS.find(f => f.value === rule.field)?.label || rule.field}</span>
                {' '}{OPERATORS.find(o => o.value === rule.operator)?.label || rule.operator}{' '}
                <span className="badge badge-amber">"{rule.value}"</span>
                {' → asignar a '}
                <span className="badge badge-blue">{users.find(u => u.id === rule.assignTo)?.name || rule.assignTo}</span>
              </div>
            </div>
            <span className="badge badge-gray">Prioridad: {rule.priority}</span>
            <button className={`btn btn-sm ${rule.active ? 'btn-secondary' : 'btn-primary'}`} onClick={() => toggleRule(rule)}>
              {rule.active ? '⏸ Desactivar' : '▶ Activar'}
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => deleteRule(rule.id)}>🗑️</button>
          </div>
        ))}
        {rules.length === 0 && (
          <div className="glass-card empty-state"><p>No hay reglas configuradas. Crea tu primera regla de asignación.</p></div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nueva Regla</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label className="label">Nombre</label><input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="grid-2">
                <div><label className="label">Campo</label><select className="input-field" value={form.field} onChange={e => setForm({ ...form, field: e.target.value })}>{FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}</select></div>
                <div><label className="label">Operador</label><select className="input-field" value={form.operator} onChange={e => setForm({ ...form, operator: e.target.value })}>{OPERATORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
              </div>
              <div><label className="label">Valor</label><input className="input-field" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} required /></div>
              <div><label className="label">Asignar a</label><select className="input-field" value={form.assignTo} onChange={e => setForm({ ...form, assignTo: e.target.value })} required><option value="">Seleccionar usuario</option>{users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}</select></div>
              <div><label className="label">Prioridad (mayor = más prioritaria)</label><input type="number" className="input-field" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Crear Regla</button>
            </form>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>{toast.msg}</div>}
    </div>
  );
}
