'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddEquipoModal({ tiendaId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [usuario, setUsuario] = useState('')
  const [area, setArea] = useState('')
  const [modelo, setModelo] = useState('')
  const [so, setSo] = useState('')
  const [procesador, setProcesador] = useState('')
  const [ram, setRam] = useState('')
  const [almacenamiento, setAlmacenamiento] = useState('')
  const [ip, setIp] = useState('')
  const [mesCreacion, setMesCreacion] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/tiendas/${tiendaId}/equipos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, area, modelo, so, procesador, ram, almacenamiento, ip, mesCreacion, nombre }),
    })
    setUsuario('')
    setArea('')
    setModelo('')
    setSo('')
    setProcesador('')
    setRam('')
    setAlmacenamiento('')
    setIp('')
    setMesCreacion('')
    setNombre('')
    setIsOpen(false)
    router.refresh()
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Añadir Equipo
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Añadir Nuevo Equipo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block mb-2">Nombre del Equipo</label>
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
                <label htmlFor="usuario" className="block mb-2">Usuario</label>
                <input
                  type="text"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="area" className="block mb-2">Área</label>
                <input
                  type="text"
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="modelo" className="block mb-2">Modelo</label>
                <input
                  type="text"
                  id="modelo"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="so" className="block mb-2">Sistema Operativo</label>
                <input
                  type="text"
                  id="so"
                  value={so}
                  onChange={(e) => setSo(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="procesador" className="block mb-2">Procesador</label>
                <input
                  type="text"
                  id="procesador"
                  value={procesador}
                  onChange={(e) => setProcesador(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="ram" className="block mb-2">RAM</label>
                <input
                  type="text"
                  id="ram"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="almacenamiento" className="block mb-2">Almacenamiento</label>
                <input
                  type="text"
                  id="almacenamiento"
                  value={almacenamiento}
                  onChange={(e) => setAlmacenamiento(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="ip" className="block mb-2">IP</label>
                <input
                  type="text"
                  id="ip"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="mesCreacion" className="block mb-2">Mes de Creación</label>
                <input
                  type="date"
                  id="mesCreacion"
                  value={mesCreacion}
                  onChange={(e) => setMesCreacion(e.target.value)}
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

