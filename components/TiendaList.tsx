'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TiendaList({ tiendas }) {
  const [editingTienda, setEditingTienda] = useState(null)
  const router = useRouter()

  const handleEdit = (tienda) => {
    setEditingTienda(tienda)
  }

  const handleSave = async (tienda) => {
    await fetch(`/api/tiendas/${tienda.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tienda),
    })
    setEditingTienda(null)
    router.refresh()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/tiendas/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tiendas.map((tienda) => (
        <div key={tienda.id} className="border p-4 rounded shadow">
          {editingTienda?.id === tienda.id ? (
            <input
              value={editingTienda.nombre}
              onChange={(e) => setEditingTienda({ ...editingTienda, nombre: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
          ) : (
            <Link href={`/tiendas/${tienda.id}`} className="text-xl font-bold">
              {tienda.nombre}
            </Link>
          )}
          <div className="mt-4 space-x-2">
            {editingTienda?.id === tienda.id ? (
              <button onClick={() => handleSave(editingTienda)} className="bg-green-500 text-white px-2 py-1 rounded">
                Guardar
              </button>
            ) : (
              <button onClick={() => handleEdit(tienda)} className="bg-blue-500 text-white px-2 py-1 rounded">
                Editar
              </button>
            )}
            <button onClick={() => handleDelete(tienda.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

