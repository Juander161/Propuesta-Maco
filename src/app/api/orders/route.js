import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const ownerId = searchParams.get('ownerId');
    const search = searchParams.get('search');

    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (ownerId) where.ownerId = ownerId;
    if (search) {
      where.OR = [
        { externalId: { contains: search } },
        { customer: { contains: search } },
        { product: { contains: search } },
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: { owner: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json({ error: 'Error al obtener órdenes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const order = await prisma.order.create({ data });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Orders POST error:', error);
    return NextResponse.json({ error: 'Error al crear orden' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const order = await prisma.order.update({ where: { id }, data });
    return NextResponse.json(order);
  } catch (error) {
    console.error('Orders PUT error:', error);
    return NextResponse.json({ error: 'Error al actualizar orden' }, { status: 500 });
  }
}
