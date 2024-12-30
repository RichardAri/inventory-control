import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const tienda = await prisma.tienda.findUnique({
    where: { id: params.id },
    include: { equipos: true },
  })
  return NextResponse.json(tienda)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const tienda = await prisma.tienda.update({
    where: { id: params.id },
    data: {
      nombre: data.nombre,
    },
  })
  return NextResponse.json(tienda)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.tienda.delete({
    where: { id: params.id },
  })
  return NextResponse.json({ message: 'Tienda eliminada' })
}

