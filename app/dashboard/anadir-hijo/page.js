"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const PLATAFORMAS = ["Instagram", "YouTube", "TikTok", "Roblox", "Minecraft", "WhatsApp"]

export default function AnadirHijo() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [plataformas, setPlataformas] = useState([])

  function togglePlataforma(p) {
    setPlataformas(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  function guardar() {
    if (!nombre.trim()) return
    const saved = JSON.parse(localStorage.getItem("hijos") || "[]")
    saved.push({ nombre: nombre.trim(), edad, plataformas })
    localStorage.setItem("hijos", JSON.stringify(saved))
    localStorage.setItem("ultimoHijo", nombre.trim())
    localStorage.setItem("ultimasPlataformas", JSON.stringify(plataformas))
    router.push("/confirmacion-hijo")
  }

  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al dashboard
        </a>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">Añadir hijo</h1>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre de tu hijo"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-400 text-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Edad</label>
            <input
              type="number"
              value={edad}
              onChange={e => setEdad(e.target.value)}
              placeholder="Edad"
              min="7"
              max="16"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-400 text-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Plataformas que usa</label>
            <div className="grid grid-cols-2 gap-3">
              {PLATAFORMAS.map((p) => (
                <label key={p} className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100">
                  <input
                    type="checkbox"
                    checked={plataformas.includes(p)}
                    onChange={() => togglePlataforma(p)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-gray-700">{p}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={guardar}
            disabled={!nombre.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
      </div>
    </main>
  )
}
