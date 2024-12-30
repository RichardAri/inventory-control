import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const reportType = searchParams.get('type')
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())

  if (reportType === 'tiendaMantenimientos') {
    const result = await prisma.mantenimiento.groupBy({
      by: ['equipo.tiendaId'],
      _count: { id: true },
      where: {
        fecha: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    })

    const tiendasWithNames = await Promise.all(
      result.map(async (item) => {
        const tienda = await prisma.tienda.findUnique({
          where: { id: item.tiendaId },
          select: { nombre: true },
        })
        return {
          ...item,
          nombreTienda: tienda?.nombre,
        }
      })
    )

    return NextResponse.json(tiendasWithNames)
  } else if (reportType === 'equipoMantenimientos') {
    const result = await prisma.mantenimiento.groupBy({
      by: ['equipoId'],
      _count: { id: true },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    })

    const equiposWithDetails = await Promise.all(
      result.map(async (item) => {
        const equipo = await prisma.equipo.findUnique({
          where: { id: item.equipoId },
          select: { usuario: true, area: true, modelo: true },
        })
        return {
          ...item,
          ...equipo,
        }
      })
    )

    return NextResponse.json(equiposWithDetails)
  }

  return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
}

