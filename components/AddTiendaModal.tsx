'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddTiendaModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [encargado, setEncargado] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/tiendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, ubicacion, encargado }),
    })
    setNombre('')
    setUbicacion('')
    setEncargado('')
    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Añadir Tienda
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Añadir Nueva Tienda</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block mb-2">Nombre de la Tienda</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="ubicacion" className="block mb-2">Ubicación</label>
                <input
                  type="text"
                  id="ubicacion"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="encargado" className="block mb-2">Encargado</label>
                <input
                  type="text"
                  id="encargado"
                  value={encargado}
                  onChange={(e) => setEncargado(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

