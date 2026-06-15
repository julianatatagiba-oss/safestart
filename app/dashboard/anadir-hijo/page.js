"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"

const PLATFORMS = [
  { name: "Roblox", color: "border-red-300 bg-red-50 text-red-600", activeColor: "border-red-500 bg-red-100 text-red-700" },
  { name: "YouTube", color: "border-red-300 bg-red-50 text-red-700", activeColor: "border-red-500 bg-red-100 text-red-800" },
  { name: "TikTok", color: "border-gray-300 bg-gray-50 text-gray-700", activeColor: "border-gray-500 bg-gray-100 text-gray-800" },
  { name: "Instagram", color: "border-pink-300 bg-pink-50 text-pink-600", activeColor: "border-pink-500 bg-pink-100 text-pink-700" },
  { name: "WhatsApp", color: "border-green-300 bg-green-50 text-green-600", activeColor: "border-green-500 bg-green-100 text-green-700" },
  { name: "Minecraft", color: "border-lime-300 bg-lime-50 text-lime-700", activeColor: "border-lime-500 bg-lime-100 text-lime-800" },
  { name: "Fortnite", color: "border-blue-300 bg-blue-50 text-blue-600", activeColor: "border-blue-500 bg-blue-100 text-blue-700" },
  { name: "Twitch", color: "border-purple-300 bg-purple-50 text-purple-600", activeColor: "border-purple-500 bg-purple-100 text-purple-700" },
]

export default function AnadirHijo() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", age: "" })
  const [selectedPlatforms, setSelectedPlatforms] = useState([])

  function togglePlatform(name) {
    setSelectedPlatforms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    const hijos = JSON.parse(localStorage.getItem("hijos") || "[]")
    hijos.push({ nombre: form.name.trim(), edad: form.age, plataformas: selectedPlatforms })
    localStorage.setItem("hijos", JSON.stringify(hijos))
    localStorage.setItem("ultimoHijo", form.name.trim())
    localStorage.setItem("ultimasPlataformas", JSON.stringify(selectedPlatforms))
    router.push("/confirmacion-hijo")
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
          <h1 className="font-black text-gray-900">Añadir hijo/a</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nombre del hijo/a
              </label>
              <input
                type="text"
                placeholder="Ej: Lucía"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Edad
              </label>
              <input
                type="number"
                min="5"
                max="18"
                placeholder="Ej: 9"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Plataformas que usa
              </label>
              <p className="text-xs text-gray-400 mb-3">Selecciona todas las que correspondan</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PLATFORMS.map((p) => {
                  const isActive = selectedPlatforms.includes(p.name)
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => togglePlatform(p.name)}
                      className={`relative border-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                        isActive ? p.activeColor : p.color
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-[#2563EB] rounded-full flex items-center justify-center">
                          <Check size={9} className="text-white" />
                        </span>
                      )}
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563EB] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200"
            >
              Añadir hijo/a
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
