import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { tiendaId: string, equipoId: string } }) {
  const mantenimientos = await prisma.mantenimiento.findMany({
    where: { equipoId: params.equipoId },
  })
  return NextResponse.json(mantenimientos)
}

export async function POST(request: Request, { params }: { params: { tiendaId: string, equipoId: string } }) {
  const data = await request.json()
  const mantenimiento = await prisma.mantenimiento.create({
    data: {
      usuario: data.usuario,
      nombreMantenimiento: data.nombreMantenimiento,
      descripcion: data.descripcion,
      personal: data.personal,
      area: data.area,
      modelo: data.modelo,
      so: data.so,
      procesador: data.procesador,
      ram: data.ram,
      almacenamiento: data.almacenamiento,
      ip: data.ip,
      fecha: new Date(data.fecha),
      equipoId: params.equipoId,
    },
  })
  return NextResponse.json(mantenimiento)
}

