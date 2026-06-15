"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Copy, Check, ExternalLink, Compass, Brain, Star } from "lucide-react"

const CATALOGO_RETOS = [
  { id: "roblox",    nombre: "Roblox",    emoji: "🎮", color: "bg-red-400",    disponible: true },
  { id: "youtube",   nombre: "YouTube",   emoji: "▶️", color: "bg-red-500",    disponible: false },
  { id: "tiktok",    nombre: "TikTok",    emoji: "🎵", color: "bg-gray-300",   disponible: false },
  { id: "instagram", nombre: "Instagram", emoji: "📸", color: "bg-pink-400",   disponible: false },
  { id: "minecraft", nombre: "Minecraft", emoji: "⛏️", color: "bg-lime-500",   disponible: false },
  { id: "whatsapp",  nombre: "WhatsApp",  emoji: "💬", color: "bg-green-400",  disponible: false },
  { id: "fortnite",  nombre: "Fortnite",  emoji: "🎯", color: "bg-blue-400",   disponible: false },
  { id: "discord",   nombre: "Discord",   emoji: "🎧", color: "bg-indigo-400", disponible: false },
]

const NIVELES = [
  { level: "Explorador", icon: Compass, emoji: "🧭", desc: "Primeros pasos en el mundo digital",        minPct: 0,    bg: "bg-blue-100",  iconColor: "text-blue-600",  badge: "bg-blue-500",  borderActive: "border-blue-200 bg-blue-50",   textActive: "text-blue-700" },
  { level: "Conocedor",  icon: Brain,   emoji: "🧠", desc: "Entiende los riesgos y cómo actuar",        minPct: 0.6,  bg: "bg-amber-100", iconColor: "text-amber-600", badge: "bg-amber-500", borderActive: "border-amber-400 bg-amber-50", textActive: "text-amber-700" },
  { level: "Experto",    icon: Star,    emoji: "⭐", desc: "Criterio sólido en todas las plataformas",  minPct: 1.0,  bg: "bg-gray-100",  iconColor: "text-gray-400",  badge: "bg-gray-300",  borderActive: "border-purple-300 bg-purple-50", textActive: "text-purple-700" },
]

export default function ProgresoHijo() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [avatar, setAvatar] = useState("🤖")
  const [avatarColor, setAvatarColor] = useState("bg-purple-400")
  const [completados, setCompletados] = useState({})
  const [plataformas, setPlataformas] = useState([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const n = localStorage.getItem("hijoNombre") || localStorage.getItem("ultimoHijo") || ""
    setNombre(n)
    const a = localStorage.getItem("hijoAvatar")
    if (a) setAvatar(a)
    const c = localStorage.getItem("hijoColor")
    if (c) setAvatarColor(c)
    const r = localStorage.getItem("retosCompletados")
    if (r) setCompletados(JSON.parse(r))
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setPlataformas(JSON.parse(p))
  }, [])

  const retosVisibles = plataformas.length > 0
    ? CATALOGO_RETOS.filter(r => plataformas.includes(r.nombre))
    : CATALOGO_RETOS.slice(0, 3)

  const retosCompletadosData = retosVisibles.filter(r => completados[r.id])
  const totalAciertos = retosCompletadosData.reduce((s, r) => s + (completados[r.id]?.aciertos ?? 0), 0)
  const totalPreguntas = retosCompletadosData.reduce((s, r) => s + (completados[r.id]?.total ?? 0), 0)
  const totalIncorrectas = totalPreguntas - totalAciertos

  const pct = totalPreguntas > 0 ? totalAciertos / totalPreguntas : 0
  const nivelActual = [...NIVELES].reverse().find(n => pct >= n.minPct) || NIVELES[0]

  const childLink = typeof window !== "undefined"
    ? `${window.location.origin}/bienvenida-hijo`
    : "safestart.app/bienvenida-hijo"

  function handleCopy() {
    navigator.clipboard.writeText(childLink).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Logros: uno por reto completado
  const logrosDesbloqueados = retosCompletadosData.map(r => ({
    name: r.nombre,
    emoji: r.emoji,
    color: r.color,
    unlocked: true,
  }))
  const logrosLocked = retosVisibles
    .filter(r => !completados[r.id])
    .map(r => ({ name: r.nombre, emoji: r.emoji, color: "bg-gray-300", unlocked: false }))
  const todosLogros = [...logrosDesbloqueados, ...logrosLocked]
  const ultimoLogro = logrosDesbloqueados[logrosDesbloqueados.length - 1]

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
          <h1 className="font-black text-gray-900">Progreso de {nombre || "tu hijo/a"}</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Identidad */}
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-5 flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center text-3xl shadow-sm shrink-0`}>
            {avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xl font-black text-gray-900">{nombre || "Tu hijo/a"}</div>
            <div className="text-sm text-gray-400">
              {nivelActual.level} Digital
              {retosCompletadosData.length > 0 && ` · ${retosCompletadosData.length} reto${retosCompletadosData.length !== 1 ? "s" : ""} completado${retosCompletadosData.length !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>

        {/* Enlace del hijo */}
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-gray-900 text-sm">Enlace del hijo/a</div>
            <span className="text-xs text-gray-400">Por si se desconecta</span>
          </div>
          <div className="flex items-center gap-2 bg-[#EFF6FF] rounded-xl px-4 py-2.5 mb-3">
            <span className="flex-1 font-mono text-xs text-[#2563EB] truncate">{childLink}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold text-sm py-2.5 rounded-xl transition-colors ${
                copied
                  ? "bg-[#16A34A] text-white"
                  : "border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-[#2563EB]"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "¡Copiado!" : "Copiar enlace"}
            </button>
            <button
              onClick={() => router.push("/dashboard-hijo")}
              className="flex-1 flex items-center justify-center gap-2 font-semibold text-sm py-2.5 rounded-xl bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors"
            >
              <ExternalLink size={14} />
              Ver su dashboard
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm shadow-blue-100 border border-blue-50 text-center">
            <div className="text-2xl font-black text-[#2563EB]">{retosCompletadosData.length}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-tight">Retos<br/>superados</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm shadow-blue-100 border border-blue-50 text-center">
            <div className="text-2xl font-black text-[#16A34A]">{totalAciertos}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-tight">Respuestas<br/>correctas</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm shadow-blue-100 border border-blue-50 text-center">
            <div className="text-2xl font-black text-[#DC2626]">{totalIncorrectas}</div>
            <div className="text-xs text-gray-500 mt-0.5 leading-tight">Respuestas<br/>incorrectas</div>
          </div>
        </div>

        {/* Retos completados */}
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-5">
          <h2 className="font-black text-gray-900 mb-4">Retos completados</h2>
          <div className="space-y-3">
            {retosVisibles.map((r) => {
              const data = completados[r.id]
              const aciertos = data?.aciertos ?? 0
              const total = data?.total ?? 3
              return (
                <div key={r.id} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
                  <span className="text-xl w-7 text-center shrink-0">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-gray-800 text-sm">{r.nombre}</span>
                      <span className="text-xs text-gray-400 font-medium">
                        {data ? `${aciertos}/${total} correctas` : r.disponible ? "Sin empezar" : "Próximamente"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: total }).map((_, i) => (
                        <span key={i} className={`text-base ${i < aciertos ? "text-[#F59E0B]" : "text-gray-200"}`}>★</span>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">
                        {data ? "mejor resultado" : "sin intentos"}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Criterio digital */}
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-5">
          <h2 className="font-black text-gray-900 mb-1">Criterio digital</h2>
          <p className="text-xs text-gray-400 mb-5">Basado en retos superados y respuestas correctas</p>
          <div className="flex gap-3">
            {NIVELES.map(({ level, emoji, desc, minPct, badge, borderActive, textActive }) => {
              const reached = pct >= minPct || level === "Explorador"
              const current = nivelActual.level === level
              return (
                <div
                  key={level}
                  className={`flex-1 rounded-2xl p-3 text-center border-2 transition-all ${
                    current ? borderActive : reached ? "border-blue-100 bg-blue-50/50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${reached ? badge : "bg-gray-200"} flex items-center justify-center mx-auto mb-2 text-xl`}>
                    {reached ? emoji : "🔒"}
                  </div>
                  <div className={`text-xs font-black mb-1 ${current ? textActive : reached ? "text-blue-700" : "text-gray-400"}`}>
                    {level}
                  </div>
                  {current && (
                    <span className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">Actual</span>
                  )}
                  <p className={`text-xs mt-1.5 leading-snug ${reached ? "text-gray-500" : "text-gray-300"}`}>{desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Logros */}
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-900">Último logro desbloqueado</h2>
            <span className="text-xs text-gray-400 font-medium">
              {logrosDesbloqueados.length}/{todosLogros.length} logros
            </span>
          </div>

          {ultimoLogro ? (
            <div className="bg-[#EDE9FE] rounded-2xl p-5 flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-full ${ultimoLogro.color} flex items-center justify-center text-3xl shadow-md shrink-0`}>
                {ultimoLogro.emoji}
              </div>
              <div>
                <div className="font-black text-[#7C3AED] text-lg">{ultimoLogro.name}</div>
                <div className="text-xs text-purple-500 mt-0.5">Desbloqueado recientemente</div>
                <div className="flex mt-1.5 gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-[#F59E0B] text-sm">⭐</span>)}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-5 text-center mb-4">
              <p className="text-gray-400 text-sm">Aún no ha desbloqueado ningún logro</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {logrosDesbloqueados.map(a => (
                <div key={a.name} title={a.name} className={`w-8 h-8 rounded-full ${a.color} flex items-center justify-center text-sm border-2 border-white`}>
                  {a.emoji}
                </div>
              ))}
              {logrosLocked.length > 0 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 border-2 border-white">
                  +{logrosLocked.length}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-gray-700">{logrosDesbloqueados.length} desbloqueados</span>
              {logrosLocked.length > 0 && ` · ${logrosLocked.length} por ganar`}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
