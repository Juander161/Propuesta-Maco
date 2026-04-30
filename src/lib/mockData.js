// Datos de prueba (Mocks) para la versión estática de GitHub Pages

export const MOCK_USERS = [
  { id: 1, name: 'María López', email: 'admin@logistica.com', role: 'ADMIN', avatar: 'ML', color: '#1F3864' },
  { id: 2, name: 'Carlos Ruiz', email: 'gerente@logistica.com', role: 'MANAGER', avatar: 'CR', color: '#2E75B6' },
  { id: 3, name: 'Ana Torres', email: 'ana@logistica.com', role: 'EMPLOYEE', avatar: 'AT', color: '#1E7E34' },
  { id: 4, name: 'Luis Mendoza', email: 'luis@logistica.com', role: 'EMPLOYEE', avatar: 'LM', color: '#6C757D' },
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-2026-08421',
    client: 'Walmart',
    productType: 'Garantía Extendida',
    owner: 'María López',
    entryDate: '15/04/2026',
    deliveryDate: '30/04/2026',
    status: 'En Proceso',
    priority: 'ALTA',
    source: 'Oracle',
    reportSource: 'Correo'
  },
  {
    id: 'ORD-2026-08399',
    client: 'Liverpool',
    productType: 'Póliza Electrónico',
    owner: 'Carlos Ruiz',
    entryDate: '14/04/2026',
    deliveryDate: '28/04/2026',
    status: 'Shortage',
    priority: 'MEDIA',
    source: 'Correo',
    reportSource: 'Correo'
  },
  {
    id: 'ORD-2026-08387',
    client: 'HEB',
    productType: 'Logística Express',
    owner: 'Ana Torres',
    entryDate: '13/04/2026',
    deliveryDate: '27/04/2026',
    status: 'Próximo',
    priority: 'BAJA',
    source: 'Ambas',
    reportSource: 'Ambas'
  },
  {
    id: 'ORD-2026-08350',
    client: 'OXXO',
    productType: 'Garantía Total',
    owner: 'Luis Mendoza',
    entryDate: '10/04/2026',
    deliveryDate: '25/04/2026',
    status: 'Backorder',
    priority: 'CRÍTICA',
    source: 'Oracle',
    reportSource: 'Oracle'
  },
  {
    id: 'ORD-2026-08301',
    client: 'Soriana',
    productType: 'Servicio Premium',
    owner: 'Carmen Vega',
    entryDate: '08/04/2026',
    deliveryDate: '23/04/2026',
    status: 'Completado',
    priority: 'BAJA',
    source: 'Ambas',
    reportSource: 'Ambas'
  }
];

export const MOCK_KPIS = {
  total: 10284,
  enProceso: 7891,
  shortage: 1203,
  backorder: 342,
  completado: 848
};

export const MOCK_RULES = [
  { id: 1, priority: 1, field: 'Tipo de Producto', operator: 'es igual a', value: 'Garantía Extendida', owner: 'María López', active: true },
  { id: 2, priority: 2, field: 'Tipo de Producto', operator: 'contiene', value: 'Logística', owner: 'Carlos Ruiz', active: true },
  { id: 3, priority: 3, field: 'Prioridad', operator: 'es igual a', value: 'ALTA', owner: 'Ana Torres', active: true },
  { id: 4, priority: 4, field: 'Región', operator: 'empieza con', value: 'CDMX', owner: 'Luis Mendoza', active: false },
  { id: 5, priority: 5, field: 'Sin coincidencia', operator: '(fallback)', value: '-', owner: 'Carmen Vega', active: true }
];

export const MOCK_TASKS = [
  { id: 1, title: 'Revisión manual de Backorders críticos', date: 'Hoy', time: '16:00', priority: 'ALTA', owner: 'Tú', type: 'Vencimiento' },
  { id: 2, title: 'Importar Open Delivery Semana 18', date: 'Mañana', time: '09:00', priority: 'MEDIA', owner: 'Sistema automático', type: 'Sincronización' },
  { id: 3, title: 'Reporte semanal de Shortages al gerente', date: 'Vie 02/05', time: '14:00', priority: 'MEDIA', owner: 'Sistema automático', type: 'Reporte' },
  { id: 4, title: 'Sincronización de reglas de asignación', date: 'Cada Lunes', time: '-', priority: 'BAJA', owner: 'Sistema automático', type: 'Recordatorio' }
];
