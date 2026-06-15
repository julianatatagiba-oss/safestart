"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const TODAS = ["Instagram", "YouTube", "TikTok", "Roblox", "Minecraft", "WhatsApp", "Discord"]

export default function AnadirPlataformas() {
  const router = useRouter()
  const [plataformas, setPlataformas] = useState([])
  const [nombre, setNombre] = useState("")

  useEffect(() => {
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setPlataformas(JSON.parse(p))
    const n = localStorage.getItem("ultimoHijo")
    if (n) setNombre(n)
  }, [])

  function toggle(p) {
    setPlataformas(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  function guardar() {
    localStorage.setItem("ultimasPlataformas", JSON.stringify(plataformas))
    const hijos = JSON.parse(localStorage.getItem("hijos") || "[]")
    const idx = hijos.findIndex(h => h.nombre === nombre)
    if (idx !== -1) {
      hijos[idx].plataformas = plataformas
      localStorage.setItem("hijos", JSON.stringify(hijos))
    }
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al dashboard
        </a>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-1">Plataformas de {nombre || "tu hijo"}</h1>
          <p className="text-gray-400 text-sm mb-6">Selecciona todas las que usa para recibir guías de seguridad</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {TODAS.map((p) => (
              <label key={p} className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 cursor-pointer hover:bg-blue-100">
                <input
                  type="checkbox"
                  checked={plataformas.includes(p)}
                  onChange={() => toggle(p)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-700 font-medium">{p}</span>
              </label>
            ))}
          </div>

          <button
            onClick={guardar}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </main>
  )
}
