'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EquipoList({ equipos, tiendaId }) {
  const [editingEquipo, setEditingEquipo] = useState(null)
  const router = useRouter()

  const handleEdit = (equipo) => {
    setEditingEquipo(equipo)
  }

  const handleSave = async (equipo) => {
    await fetch(`/api/tiendas/${tiendaId}/equipos/${equipo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipo),
    })
    setEditingEquipo(null)
    router.refresh()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/tiendas/${tiendaId}/equipos/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {equipos.map((equipo) => (
        <div key={equipo.id} className="border p-4 rounded shadow">
          {editingEquipo?.id === equipo.id ? (
            <input
              value={editingEquipo.nombre}
              onChange={(e) => setEditingEquipo({ ...editingEquipo, nombre: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
          ) : (
            <Link href={`/tiendas/${tiendaId}/equipos/${equipo.id}`} className="text-xl font-bold">
              {equipo.nombre}
            </Link>
          )}
          <div className="mt-4 space-x-2">
            {editingEquipo?.id === equipo.id ? (
              <button onClick={() => handleSave(editingEquipo)} className="bg-green-500 text-white px-2 py-1 rounded">
                Guardar
              </button>
            ) : (
              <button onClick={() => handleEdit(equipo)} className="bg-blue-500 text-white px-2 py-1 rounded">
                Editar
              </button>
            )}
            <button onClick={() => handleDelete(equipo.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

