/**
 * Motor de Reglas de Asignación Dinámica
 * Evalúa órdenes contra reglas configurables para asignar owners automáticamente
 */

export function evaluateRule(rule, order) {
  const fieldValue = order[rule.field];
  if (fieldValue === undefined || fieldValue === null) return false;

  const val = String(fieldValue).toLowerCase();
  const ruleVal = String(rule.value).toLowerCase();

  switch (rule.operator) {
    case 'equals':
      return val === ruleVal;
    case 'contains':
      return val.includes(ruleVal);
    case 'startsWith':
      return val.startsWith(ruleVal);
    case 'endsWith':
      return val.endsWith(ruleVal);
    case 'greaterThan':
      return Number(fieldValue) > Number(rule.value);
    case 'lessThan':
      return Number(fieldValue) < Number(rule.value);
    default:
      return false;
  }
}

export function assignOwner(order, rules) {
  const sortedRules = [...rules]
    .filter(r => r.active)
    .sort((a, b) => b.priority - a.priority);

  for (const rule of sortedRules) {
    if (evaluateRule(rule, order)) {
      return rule.assignTo;
    }
  }
  return null;
}

export const RULE_FIELDS = [
  { value: 'customer', label: 'Cliente' },
  { value: 'region', label: 'Región' },
  { value: 'product', label: 'Producto' },
  { value: 'quantity', label: 'Cantidad' },
  { value: 'priority', label: 'Prioridad' },
];

export const RULE_OPERATORS = [
  { value: 'equals', label: 'Es igual a' },
  { value: 'contains', label: 'Contiene' },
  { value: 'startsWith', label: 'Empieza con' },
  { value: 'endsWith', label: 'Termina con' },
  { value: 'greaterThan', label: 'Mayor que' },
  { value: 'lessThan', label: 'Menor que' },
];
