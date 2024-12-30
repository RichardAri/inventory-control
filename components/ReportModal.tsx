'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export default function ReportModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [reportType, setReportType] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const router = useRouter()

  const generateReport = async () => {
    const response = await fetch(`/api/reports?type=${reportType}&year=${year}`)
    const data = await response.json()

    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()
    const { height, width } = page.getSize()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    page.drawText(`Reporte: ${reportType === 'tiendaMantenimientos' ? 'Mantenimientos por Tienda' : 'Mantenimientos por Equipo'}`, {
      x: 50,
      y: height - 50,
      size: 20,
      font,
      color: rgb(0, 0, 0),
    })

    page.drawText(`Año: ${year}`, {
      x: 50,
      y: height - 80,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    })

    let yOffset = height - 120

    data.forEach((item, index) => {
      const text = reportType === 'tiendaMantenimientos'
        ? `${item.nombreTienda}: ${item._count.id} mantenimientos`
        : `${item.usuario} - ${item.area} - ${item.modelo}: ${item._count.id} mantenimientos`

      page.drawText(text, {
        x: 50,
        y: yOffset,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      })

      yOffset -= 20
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `reporte_${reportType}_${year}.pdf`
    link.click()
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Generar Informe
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Generar Informe</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="reportType" className="block mb-2">Tipo de Informe</label>
                <select
                  id="reportType"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="tiendaMantenimientos">Mantenimientos por Tienda</option>
                  <option value="equipoMantenimientos">Mantenimientos por Equipo</option>
                </select>
              </div>
              <div>
                <label htmlFor="year" className="block mb-2">Año</label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancelar
                </button>
                <button onClick={generateReport} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Generar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

