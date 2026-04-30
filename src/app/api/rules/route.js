import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const rules = await prisma.assignmentRule.findMany({ orderBy: { priority: 'desc' } });
    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const rule = await prisma.assignmentRule.create({ data });
    return NextResponse.json(rule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear regla' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const rule = await prisma.assignmentRule.update({ where: { id }, data });
    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar regla' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.assignmentRule.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar regla' }, { status: 500 });
  }
}
