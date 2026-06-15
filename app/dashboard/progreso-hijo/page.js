"use client"
import { useEffect, useState } from "react"

const RETOS = [
  {
    plataforma: "Roblox",
    emoji: "🎮",
    tips: [
      "Roblox fue creado para que cualquiera pueda hacer sus propios juegos. Muchos desarrolladores profesionales empezaron aquí de pequeños.",
      "El lenguaje de programación de Roblox se llama Lua — el mismo que usan algunos videojuegos AAA profesionales.",
      "Hay creadores de Roblox que ganan más de 1 millón de dólares al año con sus propias experiencias. Algunos empezaron con 10 años.",
    ],
  },
  { plataforma: "YouTube", emoji: "📺", tips: [] },
  { plataforma: "TikTok", emoji: "🎵", tips: [] },
  { plataforma: "Instagram", emoji: "📸", tips: [] },
]

export default function ProgresoHijo() {
  const [nombre, setNombre] = useState("")
  const [avatar, setAvatar] = useState("🦊")
  const [completados, setCompletados] = useState({})
  const [plataformas, setPlataformas] = useState([])

  useEffect(() => {
    const n = localStorage.getItem("ultimoHijo")
    if (n) setNombre(n)
    const a = localStorage.getItem("hijoAvatar")
    if (a) setAvatar(a)
    const c = localStorage.getItem("retosCompletados")
    if (c) setCompletados(JSON.parse(c))
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setPlataformas(JSON.parse(p))
  }, [])

  const retosVisibles = plataformas.length > 0
    ? RETOS.filter(r => plataformas.includes(r.plataforma))
    : RETOS

  const totalInsignias = Object.keys(completados).length

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto">

        <a href="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al dashboard
        </a>

        {/* Perfil hijo */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center gap-4">
          <div className="text-5xl">{avatar}</div>
          <div>
            <h1 className="text-2xl font-bold text-blue-600">{nombre || "Tu hijo"}</h1>
            <p className="text-gray-500">
              {totalInsignias === 0
                ? "Aún no ha completado ningún reto"
                : `${totalInsignias} insignia${totalInsignias !== 1 ? "s" : ""} conseguida${totalInsignias !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="ml-auto text-center bg-purple-50 rounded-xl px-4 py-3">
            <p className="text-2xl font-black text-purple-600">{totalInsignias * 100}</p>
            <p className="text-xs text-gray-400">puntos</p>
          </div>
        </div>

        {/* Progreso por plataforma */}
        <div className="space-y-4">
          {retosVisibles.map((reto) => {
            const completado = completados[reto.plataforma.toLowerCase()]
            return (
              <div key={reto.plataforma} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{reto.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-700">{reto.plataforma}</p>
                      <p className="text-xs text-gray-400">
                        {completado ? "Reto completado" : reto.tips.length > 0 ? "Reto disponible" : "Próximamente"}
                      </p>
                    </div>
                  </div>
                  {completado
                    ? <span className="text-xl">🏅</span>
                    : <span className="text-xl">🔒</span>}
                </div>

                {completado && reto.tips.length > 0 && (
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                      Lo que ha aprendido
                    </p>
                    {reto.tips.map((tip, i) => (
                      <div key={i} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-yellow-500">💡</span>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                )}

                {!completado && reto.tips.length === 0 && (
                  <p className="text-xs text-gray-300 mt-1">El reto estará disponible próximamente</p>
                )}

                {!completado && reto.tips.length > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Cuando complete el reto verás aquí lo que ha aprendido
                  </p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}
