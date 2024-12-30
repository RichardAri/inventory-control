import EquipoList from '@/components/EquipoList'
import AddEquipoModal from '@/components/AddEquipoModal'

export default async function EquiposPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tiendas/${params.id}/equipos`, { cache: 'no-store' })
  const equipos = await res.json()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Equipos</h1>
      <AddEquipoModal tiendaId={params.id} />
      <EquipoList equipos={equipos} tiendaId={params.id} />
    </main>
  )
}

