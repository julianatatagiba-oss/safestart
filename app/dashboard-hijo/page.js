"use client"
import { useEffect, useState } from "react"

const CATALOGO = [
  { nombre: "Roblox", emoji: "🎮", ruta: "/reto-roblox", disponible: true },
  { nombre: "YouTube", emoji: "📺", ruta: null, disponible: false },
  { nombre: "TikTok", emoji: "🎵", ruta: null, disponible: false },
  { nombre: "Instagram", emoji: "📸", ruta: null, disponible: false },
  { nombre: "Minecraft", emoji: "⛏️", ruta: null, disponible: false },
  { nombre: "WhatsApp", emoji: "💬", ruta: null, disponible: false },
]

export default function DashboardHijo() {
  const [completados, setCompletados] = useState({})
  const [nombre, setNombre] = useState("Tú")
  const [avatar, setAvatar] = useState("🦊")
  const [plataformas, setPlataformas] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("retosCompletados")
    if (saved) setCompletados(JSON.parse(saved))
    const n = localStorage.getItem("ultimoHijo")
    if (n) setNombre(n)
    const a = localStorage.getItem("hijoAvatar")
    if (a) setAvatar(a)
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setPlataformas(JSON.parse(p))
  }, [])

  const plataformasVisibles = plataformas.length > 0
    ? CATALOGO.filter(p => plataformas.includes(p.nombre))
    : CATALOGO

  const totalInsignias = Object.keys(completados).length

  return (
    <main className="min-h-screen bg-purple-50 p-6">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{avatar}</div>
            <div>
              <h1 className="text-xl font-bold text-purple-600">¡Hola, {nombre}!</h1>
              <p className="text-gray-400 text-sm">Nivel 1 · {totalInsignias} insignia{totalInsignias !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
              {totalInsignias * 100} pts
            </div>
            <button
              onClick={() => { localStorage.clear(); window.location.href = "/" }}
              className="text-gray-400 text-xs hover:text-gray-600"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Insignias */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <h2 className="font-bold text-gray-700 mb-3">Tus insignias 🏆</h2>
          {totalInsignias === 0 ? (
            <p className="text-gray-400 text-sm">Completa un reto para ganar tu primera insignia</p>
          ) : null}
          <div className="flex gap-2 mt-3">
            {plataformasVisibles.map((p) => (
              <div
                key={p.nombre}
                className={`flex-1 text-center rounded-xl p-3 ${completados[p.nombre.toLowerCase()] ? "bg-yellow-50 border-2 border-yellow-300" : "bg-gray-50"}`}
              >
                <div className="text-2xl mb-1">{completados[p.nombre.toLowerCase()] ? "🏅" : "🔒"}</div>
                <div className="text-xs text-gray-400">{p.nombre}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Retos */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-gray-700 mb-4">¿Por dónde empezamos?</h2>
          <div className="space-y-3">
            {plataformasVisibles.map((p) => {
              const completado = completados[p.nombre.toLowerCase()]
              return (
                <div key={p.nombre} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <p className="font-medium text-gray-700">{p.nombre}</p>
                      <p className="text-xs text-gray-400">
                        {completado ? "Completado · 3/3" : p.disponible ? "3 retos disponibles" : "Próximamente"}
                      </p>
                    </div>
                  </div>
                  {completado ? (
                    <span className="text-green-500 font-bold text-sm">✅ Hecho</span>
                  ) : p.disponible ? (
                    <a
                      href={p.ruta}
                      className="bg-purple-600 text-white text-sm px-4 py-2 rounded-full hover:bg-purple-700"
                    >
                      Empezar
                    </a>
                  ) : (
                    <span className="text-gray-300 text-sm">Pronto</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </main>
  )
}
