import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const tiendas = await prisma.tienda.findMany()
  return NextResponse.json(tiendas)
}

export async function POST(request: Request) {
  const data = await request.json()
  const tienda = await prisma.tienda.create({
    data: {
      nombre: data.nombre,
      ubicacion: data.ubicacion,
      encargado: data.encargado,
      nroEquipos: 0,
    },
  })
  return NextResponse.json(tienda)
}

