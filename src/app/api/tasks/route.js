import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const where = userId ? { userId } : {};
    const tasks = await prisma.task.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { dueDate: 'asc' },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const task = await prisma.task.create({ data });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear tarea' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const task = await prisma.task.update({ where: { id }, data });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar tarea' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar tarea' }, { status: 500 });
  }
}
