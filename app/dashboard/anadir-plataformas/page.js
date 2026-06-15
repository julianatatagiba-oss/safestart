"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"

const ALL_PLATFORMS = [
  { name: "Roblox", activeColor: "bg-red-500", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "YouTube", activeColor: "bg-red-600", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "TikTok", activeColor: "bg-gray-900", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "Instagram", activeColor: "bg-pink-500", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "WhatsApp", activeColor: "bg-green-500", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "Minecraft", activeColor: "bg-lime-600", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "Fortnite", activeColor: "bg-blue-500", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "Twitch", activeColor: "bg-purple-600", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "Discord", activeColor: "bg-indigo-500", inactiveColor: "bg-gray-100", textActive: "text-white", textInactive: "text-gray-500" },
  { name: "Snapchat", activeColor: "bg-yellow-400", inactiveColor: "bg-gray-100", textActive: "text-gray-900", textInactive: "text-gray-500" },
]

export default function AnadirPlataformas() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [active, setActive] = useState([])

  useEffect(() => {
    const n = localStorage.getItem("ultimoHijo") || ""
    setNombre(n)
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setActive(JSON.parse(p))
    const hijos = JSON.parse(localStorage.getItem("hijos") || "[]")
    const hijo = hijos.find(h => h.nombre === n)
    if (hijo) setEdad(hijo.edad)
  }, [])

  function toggle(name) {
    setActive((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  function guardar() {
    localStorage.setItem("ultimasPlataformas", JSON.stringify(active))
    const hijos = JSON.parse(localStorage.getItem("hijos") || "[]")
    const idx = hijos.findIndex(h => h.nombre === nombre)
    if (idx !== -1) {
      hijos[idx].plataformas = active
      localStorage.setItem("hijos", JSON.stringify(hijos))
    }
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF] font-[Inter,sans-serif]">
      <header className="bg-white border-b border-blue-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 leading-tight">
              Plataformas de {nombre || "tu hijo/a"}
            </h1>
            {edad && <p className="text-xs text-gray-400">{edad} años</p>}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-6">
          <p className="text-sm text-gray-500 mb-6">
            Activa las plataformas que usa tu hijo/a. Las activas tendrán guía y retos disponibles.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {ALL_PLATFORMS.map((p) => {
              const isActive = active.includes(p.name)
              return (
                <button
                  key={p.name}
                  onClick={() => toggle(p.name)}
                  className={`relative flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? `${p.activeColor} ${p.textActive} shadow-sm`
                      : `${p.inactiveColor} ${p.textInactive}`
                  }`}
                >
                  <span>{p.name}</span>
                  {isActive && <Check size={14} />}
                </button>
              )
            })}
          </div>

          <div className="bg-[#EFF6FF] rounded-xl p-4 mb-6">
            <div className="text-xs font-bold text-[#2563EB] mb-1">
              {active.length} plataforma{active.length !== 1 ? "s" : ""} activa{active.length !== 1 ? "s" : ""}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {active.map((name) => (
                <span key={name} className="bg-[#2563EB] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {name}
                </span>
              ))}
              {active.length === 0 && (
                <span className="text-xs text-gray-400">Ninguna seleccionada</span>
              )}
            </div>
          </div>

          <button
            onClick={guardar}
            className="w-full bg-[#2563EB] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200"
          >
            Guardar cambios
          </button>
        </div>
      </main>
    </div>
  )
}
