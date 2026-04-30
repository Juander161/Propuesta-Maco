import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalOrders,
      ordersByStatus,
      ordersByPriority,
      ordersByOwner,
      shortageCount,
      backorderCount,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.groupBy({ by: ['status'], _count: { status: true } }),
      prisma.order.groupBy({ by: ['priority'], _count: { priority: true } }),
      prisma.order.groupBy({ by: ['ownerId'], _count: { ownerId: true } }),
      prisma.order.count({ where: { shortage: true } }),
      prisma.order.count({ where: { backorder: true } }),
      prisma.order.findMany({
        where: { priority: { in: ['ALTA', 'CRITICA'] } },
        include: { owner: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);

    // Resolve owner names
    const ownerIds = ordersByOwner.map(o => o.ownerId).filter(Boolean);
    const owners = await prisma.user.findMany({
      where: { id: { in: ownerIds } },
      select: { id: true, name: true },
    });
    const ownerMap = Object.fromEntries(owners.map(o => [o.id, o.name]));

    const distribution = ordersByOwner.map(o => ({
      name: ownerMap[o.ownerId] || 'Sin asignar',
      count: o._count.ownerId,
    }));

    return NextResponse.json({
      totalOrders,
      shortageCount,
      backorderCount,
      pendingCount: ordersByStatus.find(s => s.status === 'PENDIENTE')?._count?.status || 0,
      statusBreakdown: ordersByStatus.map(s => ({ status: s.status, count: s._count.status })),
      priorityBreakdown: ordersByPriority.map(p => ({ priority: p.priority, count: p._count.priority })),
      distribution,
      criticalOrders: recentOrders,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Error al obtener datos del dashboard' }, { status: 500 });
  }
}
