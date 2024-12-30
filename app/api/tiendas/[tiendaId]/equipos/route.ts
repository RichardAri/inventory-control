import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { tiendaId: string } }) {
  const equipos = await prisma.equipo.findMany({
    where: { tiendaId: params.tiendaId },
  })
  return NextResponse.json(equipos)
}

export async function POST(request: Request, { params }: { params: { tiendaId: string } }) {
  const data = await request.json()
  const equipo = await prisma.equipo.create({
    data: {
      usuario: data.usuario,
      area: data.area,
      modelo: data.modelo,
      so: data.so,
      procesador: data.procesador,
      ram: data.ram,
      almacenamiento: data.almacenamiento,
      ip: data.ip,
      mesCreacion: new Date(data.mesCreacion),
      tiendaId: params.tiendaId,
    },
  })
  await prisma.tienda.update({
    where: { id: params.tiendaId },
    data: { nroEquipos: { increment: 1 } },
  })
  return NextResponse.json(equipo)
}

export async function DELETE(request: Request, { params }: { params: { tiendaId: string, id: string } }) {
  await prisma.equipo.delete({
    where: { id: params.id },
  })
  await prisma.tienda.update({
    where: { id: params.tiendaId },
    data: { nroEquipos: { decrement: 1 } },
  })
  return NextResponse.json({ message: 'Equipo eliminado' })
}

