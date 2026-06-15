"use client"
import { useEffect, useState } from "react"

const RETOS = [
  {
    plataforma: "Roblox",
    emoji: "🎮",
    insignia: "Explorador Seguro",
    tips: [
      "Roblox fue creado para que cualquiera pueda hacer sus propios juegos. Muchos desarrolladores profesionales empezaron aquí de pequeños.",
      "El lenguaje de programación de Roblox se llama Lua — el mismo que usan algunos videojuegos AAA profesionales.",
      "Hay creadores de Roblox que ganan más de 1 millón de dólares al año con sus propias experiencias.",
    ],
  },
  { plataforma: "YouTube", emoji: "📺", insignia: "Espectador Consciente", tips: [] },
  { plataforma: "TikTok", emoji: "🎵", insignia: "Creador Seguro", tips: [] },
  { plataforma: "Instagram", emoji: "📸", insignia: "Perfil Protegido", tips: [] },
]

function diagnostico(aciertos, total) {
  const pct = aciertos / total
  if (pct === 1) return { texto: "Toma decisiones seguras de forma natural. Excelente nivel.", nivel: "Alto", color: "text-green-600", bg: "bg-green-50", borde: "border-green-200" }
  if (pct >= 0.6) return { texto: "Va por buen camino. Hay algunos conceptos que puede reforzar.", nivel: "Medio", color: "text-yellow-600", bg: "bg-yellow-50", borde: "border-yellow-200" }
  return { texto: "Está aprendiendo. Conviene repasar los conceptos básicos juntos.", nivel: "Básico", color: "text-red-500", bg: "bg-red-50", borde: "border-red-200" }
}

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

  const retosCompletadosData = retosVisibles
    .map(r => ({ ...r, data: completados[r.plataforma.toLowerCase()] }))
    .filter(r => r.data)

  const totalAciertos = retosCompletadosData.reduce((sum, r) => sum + (r.data?.aciertos ?? 0), 0)
  const totalPreguntas = retosCompletadosData.reduce((sum, r) => sum + (r.data?.total ?? 0), 0)
  const totalInsignias = retosCompletadosData.length

  const diag = totalPreguntas > 0 ? diagnostico(totalAciertos, totalPreguntas) : null

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto">

        <a href="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al dashboard
        </a>

        {/* Perfil */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center gap-4">
          <div className="text-5xl">{avatar}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-blue-600">{nombre || "Tu hijo"}</h1>
            <p className="text-gray-500 text-sm">
              {totalInsignias === 0
                ? "Aún no ha completado ningún reto"
                : `${totalInsignias} insignia${totalInsignias !== 1 ? "s" : ""} · ${totalAciertos} de ${totalPreguntas} respuestas correctas`}
            </p>
          </div>
          <div className="text-center bg-purple-50 rounded-xl px-4 py-3">
            <p className="text-2xl font-black text-purple-600">{totalInsignias * 100}</p>
            <p className="text-xs text-gray-400">puntos</p>
          </div>
        </div>

        {/* Diagnóstico */}
        {diag && (
          <div className={`rounded-2xl border-2 p-5 mb-6 ${diag.bg} ${diag.borde}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Diagnóstico de seguridad</p>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-black text-lg ${diag.color}`}>Nivel {diag.nivel}</span>
            </div>
            <p className="text-sm text-gray-600">{diag.texto}</p>
          </div>
        )}

        {/* Retos */}
        <div className="space-y-4">
          {retosVisibles.map((reto) => {
            const data = completados[reto.plataforma.toLowerCase()]
            const completado = !!data
            const aciertos = data?.aciertos ?? 0
            const total = data?.total ?? 0
            const errores = total - aciertos

            return (
              <div key={reto.plataforma} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{reto.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-700">{reto.plataforma}</p>
                      {completado
                        ? <p className="text-xs text-gray-400">🏅 {reto.insignia}</p>
                        : <p className="text-xs text-gray-400">{reto.tips.length > 0 ? "Reto disponible" : "Próximamente"}</p>}
                    </div>
                  </div>
                  <span className="text-2xl">{completado ? "🏅" : "🔒"}</span>
                </div>

                {completado && (
                  <>
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                        <p className="text-2xl font-black text-green-600">{aciertos}</p>
                        <p className="text-xs text-gray-500">correctas</p>
                      </div>
                      <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                        <p className="text-2xl font-black text-red-400">{errores}</p>
                        <p className="text-xs text-gray-500">incorrectas</p>
                      </div>
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                        <p className="text-2xl font-black text-gray-600">{total}</p>
                        <p className="text-xs text-gray-500">total</p>
                      </div>
                    </div>

                    {reto.tips.length > 0 && (
                      <div className="border-t pt-3 space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Lo que ha aprendido</p>
                        {data?.tipsDesbloqueados?.length > 0 ? (
                          data.tipsDesbloqueados.map((idx) => (
                            <div key={idx} className="flex gap-2 text-sm text-gray-600">
                              <span className="text-yellow-500 shrink-0">💡</span>
                              <p>{reto.tips[idx]}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400">No desbloqueó ningún dato en este reto</p>
                        )}
                      </div>
                    )}
                  </>
                )}

                {!completado && reto.tips.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Cuando complete el reto verás aquí su puntuación y lo que ha aprendido
                  </p>
                )}
                {!completado && reto.tips.length === 0 && (
                  <p className="text-xs text-gray-300 mt-1">El reto estará disponible próximamente</p>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}
