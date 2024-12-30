import TiendaList from '@/components/TiendaList'
import AddTiendaModal from '@/components/AddTiendaModal'
import ReportModal from '@/components/ReportModal'

export default async function TiendasPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tiendas`, { cache: 'no-store' })
  const tiendas = await res.json()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Tiendas</h1>
      <AddTiendaModal />
      <ReportModal />
      <TiendaList tiendas={tiendas} />
    </main>
  )
}

