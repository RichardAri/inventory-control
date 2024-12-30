import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { tiendaId: string, id: string } }) {
  const equipo = await prisma.equipo.findUnique({
    where: { id: params.id },
    include: { mantenimientos: true },
  })
  return NextResponse.json(equipo)
}

export async function PUT(request: Request, { params }: { params: { tiendaId: string, id: string } }) {
  const data = await request.json()
  const equipo = await prisma.equipo.update({
    where: { id: params.id },
    data: {
      nombre: data.nombre,
    },
  })
  return NextResponse.json(equipo)
}

export async function DELETE(request: Request, { params }: { params: { tiendaId: string, id: string } }) {
  await prisma.equipo.delete({
    where: { id: params.id },
  })
  return NextResponse.json({ message: 'Equipo eliminado' })
}

