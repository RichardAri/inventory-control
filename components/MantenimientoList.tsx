'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MantenimientoList({ mantenimientos, tiendaId, equipoId }) {
  const [editingMantenimiento, setEditingMantenimiento] = useState(null)
  const router = useRouter()

  const handleEdit = (mantenimiento) => {
    setEditingMantenimiento(mantenimiento)
  }

  const handleSave = async (mantenimiento) => {
    await fetch(`/api/tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos/${mantenimiento.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mantenimiento),
    })
    setEditingMantenimiento(null)
    router.refresh()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/tiendas/${tiendaId}/equipos/${equipoId}/mantenimientos/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {mantenimientos.map((mantenimiento) => (
        <div key={mantenimiento.id} className="border p-4 rounded shadow">
          {editingMantenimiento?.id === mantenimiento.id ? (
            <>
              <input
                type="date"
                value={new Date(mantenimiento.fecha).toISOString().split('T')[0]}
                onChange={(e) => setEditingMantenimiento({ ...editingMantenimiento, fecha: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={mantenimiento.descripcion}
                onChange={(e) => setEditingMantenimiento({ ...editingMantenimiento, descripcion: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
            </>
          ) : (
            <>
              <p className="font-bold">{new Date(mantenimiento.fecha).toLocaleDateString()}</p>
              <p>{mantenimiento.descripcion}</p>
            </>
          )}
          <div className="mt-4 space-x-2">
            {editingMantenimiento?.id === mantenimiento.id ? (
              <button onClick={() => handleSave(editingMantenimiento)} className="bg-green-500 text-white px-2 py-1 rounded">
                Guardar
              </button>
            ) : (
              <button onClick={() => handleEdit(mantenimiento)} className="bg-blue-500 text-white px-2 py-1 rounded">
                Editar
              </button>
            )}
            <button onClick={() => handleDelete(mantenimiento.id)} className="bg-red-500 text-white px-2 py-1 rounded">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

