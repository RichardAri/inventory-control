import MantenimientoList from '@/components/MantenimientoList'
import AddMantenimientoModal from '@/components/AddMantenimientoModal'

export default async function MantenimientosPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tiendas/${params.tiendaId}/equipos/${params.id}/mantenimientos`, { cache: 'no-store' })
  const mantenimientos = await res.json()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Mantenimientos</h1>
      <AddMantenimientoModal tiendaId={params.tiendaId} equipoId={params.id} />
      <MantenimientoList mantenimientos={mantenimientos} tiendaId={params.tiendaId} equipoId={params.id} />
    </main>
  )
}

