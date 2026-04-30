'use client';
import { useState } from 'react';
import { MOCK_RULES } from '@/lib/mockData';
import styles from './opendelivery.module.css';

export default function OpenDeliveryPage() {
  const [syncing, setSyncing] = useState(false);
  const [step, setStep] = useState(0);

  const handleSync = () => {
    setSyncing(true);
    setStep(1);
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2500);
    setTimeout(() => {
      setStep(4);
      setTimeout(() => {
        setSyncing(false);
        setStep(0);
        alert('Sincronización completada exitosamente.');
      }, 500);
    }, 4000);
  };

  return (
    <div className="flex-col gap-4 h-full">
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div>
          <h1 className="page-title">Open Delivery</h1>
          <p className="page-subtitle">Procesamiento y Extracción de Datos</p>
        </div>
        <div className="flex-row items-center gap-3">
          <span className={styles.lastSync}>Última act. hace 5 min</span>
          <button 
            className="btn btn-primary" 
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? 'Sincronizando...' : '🔄 Sincronizar Manual'}
          </button>
        </div>
      </div>

      {/* TOP PANEL: Importación */}
      <div className="card" style={{ display: 'flex', gap: '24px', height: '280px' }}>
        
        {/* Bandeja Simulada */}
        <div className={styles.inboxPanel}>
          <h3 className={styles.panelTitle}>Bandeja de Correo Simulada</h3>
          <div className={styles.emailList}>
            <div className={styles.emailItem}>
              <div className={styles.emailIcon}>📧</div>
              <div className={styles.emailContent}>
                <div className={styles.emailSubject}>Reporte_OD_18_Abril.xlsx</div>
                <div className={styles.emailSender}>oracle_reports@logistica.com</div>
              </div>
              <div className={styles.emailTime}>10:42 AM</div>
            </div>
            <div className={styles.emailItem}>
              <div className={styles.emailIcon}>📧</div>
              <div className={styles.emailContent}>
                <div className={styles.emailSubject}>Actualizacion_Inventario_Q2.csv</div>
                <div className={styles.emailSender}>wms_system@logistica.com</div>
              </div>
              <div className={styles.emailTime}>09:15 AM</div>
            </div>
            <div className={styles.emailItem}>
              <div className={styles.emailIcon}>📧</div>
              <div className={styles.emailContent}>
                <div className={styles.emailSubject}>Backorders_Pendientes.xlsx</div>
                <div className={styles.emailSender}>alerts@logistica.com</div>
              </div>
              <div className={styles.emailTime}>Ayer</div>
            </div>
          </div>
        </div>

        <div className={styles.verticalDivider}></div>

        {/* Pipeline Stepper */}
        <div className={styles.stepperPanel}>
          <h3 className={styles.panelTitle}>Estado del Procesamiento</h3>
          
          <div className={styles.stepper}>
            <div className={`${styles.step} ${step >= 1 ? styles.stepActive : ''}`}>
              <div className={styles.stepCircle}>{step > 1 ? '✓' : '1'}</div>
              <div className={styles.stepLabel}>Recepción</div>
            </div>
            <div className={styles.stepLine} data-active={step >= 2}></div>
            
            <div className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>
              <div className={styles.stepCircle}>{step > 2 ? '✓' : '2'}</div>
              <div className={styles.stepLabel}>Extracción</div>
            </div>
            <div className={styles.stepLine} data-active={step >= 3}></div>
            
            <div className={`${styles.step} ${step >= 3 ? styles.stepActive : ''}`}>
              <div className={styles.stepCircle}>{step === 3 ? '⏳' : step > 3 ? '✓' : '3'}</div>
              <div className={styles.stepLabel}>Limpieza</div>
            </div>
            <div className={styles.stepLine} data-active={step >= 4}></div>
            
            <div className={`${styles.step} ${step >= 4 ? styles.stepActive : ''}`}>
              <div className={styles.stepCircle}>{step >= 4 ? '✓' : '4'}</div>
              <div className={styles.stepLabel}>Integración</div>
            </div>
          </div>

          <div className={styles.processingStatus}>
            {syncing ? 'Procesando archivo Reporte_OD_18_Abril.xlsx...' : 'Esperando nuevos archivos...'}
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL: Motor de Reglas */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="flex-row justify-between items-center" style={{ marginBottom: 16 }}>
          <h3 className={styles.panelTitle}>Motor de Asignación Automática</h3>
          <button className="btn btn-outlined btn-sm">+ Nueva Regla</button>
        </div>
        
        <div style={{ overflowY: 'auto' }}>
          <table className="corp-table">
            <thead>
              <tr>
                <th>Prioridad</th>
                <th>Campo (Condición)</th>
                <th>Operador</th>
                <th>Valor Esperado</th>
                <th>Asignado a</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RULES.map((rule) => (
                <tr key={rule.id}>
                  <td><strong>{rule.priority}</strong></td>
                  <td>{rule.field}</td>
                  <td><span className="badge badge-gray">{rule.operator}</span></td>
                  <td>{rule.value}</td>
                  <td>{rule.owner}</td>
                  <td>
                    <span className={`badge ${rule.active ? 'badge-green' : 'badge-gray'}`}>
                      {rule.active ? 'ACTIVA' : 'INACTIVA'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outlined" style={{ height: 28, padding: '0 8px', fontSize: 12 }}>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
