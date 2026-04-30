/**
 * RBAC - Control de Acceso Basado en Roles
 * Roles: ADMIN, MANAGER, EMPLOYEE
 */

const PERMISSIONS = {
  ADMIN: {
    orders: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    rules: ['create', 'read', 'update', 'delete'],
    tasks: ['create', 'read', 'update', 'delete'],
    dashboard: ['read'],
    export: ['read'],
    audit: ['read'],
  },
  MANAGER: {
    orders: ['create', 'read', 'update'],
    users: ['read'],
    rules: ['create', 'read', 'update'],
    tasks: ['create', 'read', 'update', 'delete'],
    dashboard: ['read'],
    export: ['read'],
    audit: ['read'],
  },
  EMPLOYEE: {
    orders: ['read', 'update'],
    users: [],
    rules: ['read'],
    tasks: ['create', 'read', 'update'],
    dashboard: ['read'],
    export: ['read'],
    audit: [],
  },
};

export function hasPermission(role, resource, action) {
  const rolePerms = PERMISSIONS[role];
  if (!rolePerms) return false;
  const resourcePerms = rolePerms[resource];
  if (!resourcePerms) return false;
  return resourcePerms.includes(action);
}

export function getVisibleModules(role) {
  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart', path: '/dashboard' },
    { id: 'orders', label: 'Open Delivery', icon: 'truck', path: '/open-delivery' },
    { id: 'rules', label: 'Reglas', icon: 'settings', path: '/open-delivery/reglas' },
    { id: 'queries', label: 'Consultas', icon: 'search', path: '/consultas' },
    { id: 'tasks', label: 'Calendario', icon: 'calendar', path: '/calendario' },
    { id: 'export', label: 'Exportar', icon: 'download', path: '/exportar' },
  ];

  if (role === 'ADMIN') {
    modules.push({ id: 'users', label: 'Usuarios', icon: 'users', path: '/admin/usuarios' });
    modules.push({ id: 'audit', label: 'Auditoría', icon: 'shield', path: '/admin/auditoria' });
  }

  return modules;
}

export const ROLE_LABELS = {
  ADMIN: 'Administrador',
  MANAGER: 'Gerente',
  EMPLOYEE: 'Empleado',
};
