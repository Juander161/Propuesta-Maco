/**
 * Seed de datos iniciales para desarrollo
 * Ejecutar: node src/lib/seed.js
 */
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Crear usuarios
  const adminPass = await bcrypt.hash('admin123', 10);
  const managerPass = await bcrypt.hash('manager123', 10);
  const employeePass = await bcrypt.hash('employee123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@logistica.com' },
    update: {},
    create: {
      email: 'admin@logistica.com',
      password: adminPass,
      name: 'Carlos Admin',
      role: 'ADMIN',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'gerente@logistica.com' },
    update: {},
    create: {
      email: 'gerente@logistica.com',
      password: managerPass,
      name: 'María García',
      role: 'MANAGER',
    },
  });

  const employee1 = await prisma.user.upsert({
    where: { email: 'juan@logistica.com' },
    update: {},
    create: {
      email: 'juan@logistica.com',
      password: employeePass,
      name: 'Juan López',
      role: 'EMPLOYEE',
    },
  });

  const employee2 = await prisma.user.upsert({
    where: { email: 'ana@logistica.com' },
    update: {},
    create: {
      email: 'ana@logistica.com',
      password: employeePass,
      name: 'Ana Martínez',
      role: 'EMPLOYEE',
    },
  });

  // Crear órdenes de ejemplo
  const statuses = ['PENDIENTE', 'EN_PROGRESO', 'ENVIADO', 'ENTREGADO', 'SHORTAGE', 'BACKORDER'];
  const priorities = ['BAJA', 'NORMAL', 'ALTA', 'CRITICA'];
  const customers = ['Walmart México', 'OXXO', 'Soriana', 'Chedraui', 'HEB', 'Liverpool', 'Costco', 'Sam\'s Club'];
  const products = ['Producto A-100', 'Producto B-200', 'Producto C-300', 'Producto D-400', 'Producto E-500'];
  const regions = ['Norte', 'Sur', 'Centro', 'Occidente', 'Oriente'];
  const owners = [admin, manager, employee1, employee2];

  for (let i = 1; i <= 50; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    await prisma.order.upsert({
      where: { externalId: `OD-2026-${String(i).padStart(4, '0')}` },
      update: {},
      create: {
        externalId: `OD-2026-${String(i).padStart(4, '0')}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        status: status,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        ownerId: owners[Math.floor(Math.random() * owners.length)].id,
        shortage: status === 'SHORTAGE',
        backorder: status === 'BACKORDER',
        product: products[Math.floor(Math.random() * products.length)],
        quantity: Math.floor(Math.random() * 500) + 10,
        region: regions[Math.floor(Math.random() * regions.length)],
        notes: Math.random() > 0.7 ? 'Requiere atención especial' : null,
      },
    });
  }

  // Crear reglas de asignación
  await prisma.assignmentRule.createMany({
    data: [
      {
        name: 'Walmart → María',
        field: 'customer',
        operator: 'contains',
        value: 'Walmart',
        assignTo: manager.id,
        priority: 10,
        active: true,
      },
      {
        name: 'Región Norte → Juan',
        field: 'region',
        operator: 'equals',
        value: 'Norte',
        assignTo: employee1.id,
        priority: 5,
        active: true,
      },
      {
        name: 'Alta Prioridad → Admin',
        field: 'priority',
        operator: 'equals',
        value: 'CRITICA',
        assignTo: admin.id,
        priority: 20,
        active: true,
      },
    ],
    skipDuplicates: true,
  });

  // Crear tareas de ejemplo
  const now = new Date();
  await prisma.task.createMany({
    data: [
      {
        title: 'Revisar órdenes pendientes',
        description: 'Verificar todas las órdenes en estado pendiente del día',
        dueDate: new Date(now.getTime() + 86400000),
        userId: manager.id,
        emailAlert: true,
      },
      {
        title: 'Contactar cliente Walmart',
        description: 'Seguimiento de orden con shortage',
        dueDate: new Date(now.getTime() + 172800000),
        userId: employee1.id,
        emailAlert: false,
      },
      {
        title: 'Reporte semanal',
        description: 'Generar y enviar reporte semanal de operaciones',
        dueDate: new Date(now.getTime() + 432000000),
        userId: admin.id,
        emailAlert: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed completado');
  console.log(`   Usuarios: ${await prisma.user.count()}`);
  console.log(`   Órdenes: ${await prisma.order.count()}`);
  console.log(`   Reglas: ${await prisma.assignmentRule.count()}`);
  console.log(`   Tareas: ${await prisma.task.count()}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
