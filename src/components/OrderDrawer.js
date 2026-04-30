'use client';
import styles from './OrderDrawer.module.css';

export default function OrderDrawer({ order, onClose }) {
  if (!order) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.drawer}>
        
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{order.id}</h2>
            <div className="flex-row items-center gap-2" style={{ marginTop: '8px' }}>
              <span className="badge badge-blue">{order.status}</span>
              <span className="badge badge-gray">{order.priority}</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Información General</h3>
            <div className="grid-2">
              <div className={styles.infoGroup}>
                <label>Cliente</label>
                <p>{order.client}</p>
              </div>
              <div className={styles.infoGroup}>
                <label>Responsable</label>
                <p>{order.owner}</p>
              </div>
              <div className={styles.infoGroup}>
                <label>Fecha de Ingreso</label>
                <p>{order.entryDate}</p>
              </div>
              <div className={styles.infoGroup}>
                <label>Fecha de Entrega</label>
                <p>{order.deliveryDate}</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Progreso de Orden</h3>
            
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles.completed}`}>✓</div>
                <div className={styles.timelineContent}>
                  <h4>Orden Creada</h4>
                  <p>Sistema Oracle — {order.entryDate}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${styles.completed}`}>✓</div>
                <div className={styles.timelineContent}>
                  <h4>Asignación</h4>
                  <p>Regla Automática — {order.entryDate}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${order.status !== 'En Proceso' ? styles.completed : styles.active}`}>
                  {order.status !== 'En Proceso' ? '✓' : '🔄'}
                </div>
                <div className={styles.timelineContent}>
                  <h4>Procesamiento</h4>
                  <p>En curso por {order.owner}</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <h4>Completado</h4>
                  <p>Pendiente</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.footer}>
          <button className="btn btn-outlined">Editar Orden</button>
          <button className="btn btn-primary">Actualizar Estado</button>
        </div>

      </div>
    </>
  );
}
