import { getMantenimientos } from '@/lib/firestore'
import MantenimientoList from '@/components/MantenimientoList'
import AddMantenimientoModal from '@/components/AddMantenimientoModal'

export default async function MantenimientosPage({ params }) {
  const mantenimientos = await getMantenimientos(params.tiendaId, params.equipoId)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Mantenimientos</h1>
      <AddMantenimientoModal tiendaId={params.tiendaId} equipoId={params.equipoId} />
      <MantenimientoList mantenimientos={mantenimientos} tiendaId={params.tiendaId} equipoId={params.equipoId} />
    </main>
  )
}

