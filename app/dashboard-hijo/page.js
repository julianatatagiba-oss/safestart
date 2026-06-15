"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Star, Lock, Lightbulb, X, ChevronRight, ChevronDown, BookOpen, CheckCircle, Copy, Check, ExternalLink } from "lucide-react"
import { AppIcon } from "@/components/AppIcon"

const CATALOGO = [
  { id: "roblox",    nombre: "Roblox",    emoji: "🎮", color: "bg-red-100 text-red-600",    ruta: "/reto-roblox", disponible: true },
  { id: "youtube",   nombre: "YouTube",   emoji: "▶️", color: "bg-red-100 text-red-700",    ruta: null, disponible: false },
  { id: "tiktok",    nombre: "TikTok",    emoji: "🎵", color: "bg-gray-100 text-gray-700",  ruta: null, disponible: false },
  { id: "instagram", nombre: "Instagram", emoji: "📸", color: "bg-pink-100 text-pink-600",  ruta: null, disponible: false },
  { id: "minecraft", nombre: "Minecraft", emoji: "⛏️", color: "bg-lime-100 text-lime-700",  ruta: null, disponible: false },
  { id: "whatsapp",  nombre: "WhatsApp",  emoji: "💬", color: "bg-green-100 text-green-600",ruta: null, disponible: false },
  { id: "fortnite",  nombre: "Fortnite",  emoji: "🎯", color: "bg-blue-100 text-blue-600",  ruta: null, disponible: false },
  { id: "twitch",    nombre: "Twitch",    emoji: "📡", color: "bg-purple-100 text-purple-600",ruta: null, disponible: false },
  { id: "discord",   nombre: "Discord",   emoji: "🎧", color: "bg-indigo-100 text-indigo-600",ruta: null, disponible: false },
  { id: "snapchat",  nombre: "Snapchat",  emoji: "👻", color: "bg-yellow-100 text-yellow-600",ruta: null, disponible: false },
]

const ESCENARIOS_ROBLOX = [
  {
    situacion: "Un jugador que no conoces te pide que entres a un chat de voz privado para coordinar el juego.",
    respuestaCorrecta: "Le dices que prefieres el chat de texto del juego",
    explicacion: "El chat de voz hace que la conversación se sienta más personal y es mucho más difícil de moderar. Con desconocidos, el chat del juego es siempre la opción más segura.",
  },
  {
    situacion: "Un jugador dice que tiene Robux gratis para darte. Solo tienes que decirle tu nombre de usuario.",
    respuestaCorrecta: "Ignoras el mensaje — nadie regala Robux gratis",
    explicacion: "Nadie regala Robux gratis. Es una de las estafas más comunes en Roblox.",
  },
  {
    situacion: "Entras a un mundo de Roblox que te hace sentir incómodo. Tus amigos dicen que está bien.",
    respuestaCorrecta: "Reportas el mundo, sales y se lo cuentas a un adulto",
    explicacion: "Si algo te hace sentir incómodo, confía en ese instinto. Reportar ayuda a que ese mundo desaparezca para otros niños.",
  },
]

const TIPS_ROBLOX = [
  { icono: "💡", texto: "Roblox fue creado para que cualquiera pueda hacer sus propios juegos. Muchos desarrolladores profesionales empezaron aquí de pequeños." },
  { icono: "🚀", texto: "El lenguaje de programación de Roblox se llama Lua — el mismo que usan algunos videojuegos AAA profesionales." },
  { icono: "🤑", texto: "Hay creadores de Roblox que ganan más de 1 millón de dólares al año con sus propias experiencias. Algunos empezaron con 10 años." },
]

export default function DashboardHijo() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [avatar, setAvatar] = useState("🤖")
  const [avatarColor, setAvatarColor] = useState("bg-[#7C3AED]")
  const [plataformas, setPlataformas] = useState([])
  const [completados, setCompletados] = useState({})
  const [showTips, setShowTips] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [openLesson, setOpenLesson] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const hijoNombre = localStorage.getItem("hijoNombre") || localStorage.getItem("ultimoHijo") || "Explorador"
    setNombre(hijoNombre)
    const a = localStorage.getItem("hijoAvatar")
    if (a) setAvatar(a)
    const c = localStorage.getItem("hijoColor")
    if (c) setAvatarColor(c)
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setPlataformas(JSON.parse(p))
    const r = localStorage.getItem("retosCompletados")
    if (r) setCompletados(JSON.parse(r))
  }, [])

  const plataformasVisibles = plataformas.length > 0
    ? CATALOGO.filter(p => plataformas.includes(p.nombre))
    : CATALOGO.slice(0, 3)

  const totalAciertos = Object.values(completados).reduce((sum, r) => sum + (r.aciertos || 0), 0)
  const puntos = totalAciertos * 100
  const retosCompletados = Object.entries(completados).filter(([, r]) => r.completado)
  const ultimoLogro = retosCompletados[retosCompletados.length - 1]

  const tipsDesbloqueados = completados.roblox?.tipsDesbloqueados || []
  const tipsVisibles = TIPS_ROBLOX.filter((_, i) => tipsDesbloqueados.includes(i))

  function handleCopy() {
    const url = `${window.location.origin}/insignia/roblox?nombre=${encodeURIComponent(nombre)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const nextChallenge = plataformasVisibles.find(p => !completados[p.id] && p.disponible)

  return (
    <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif]">

      {/* Header */}
      <div className="bg-[#7C3AED] px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <AppIcon size={28} />
            <span className="font-black text-white text-sm">SafeStart</span>
          </div>
          <div className="flex items-center gap-2">
            {puntos > 0 && (
              <div className="bg-[#F59E0B] text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={10} />
                {puntos} pts
              </div>
            )}
            <button
              onClick={() => { localStorage.clear(); router.push("/") }}
              className="text-purple-300 text-xs hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center shadow-lg shadow-purple-900/30 text-3xl`}>
            {avatar}
          </div>
          <div>
            <div className="font-black text-white text-xl">¡Hola, {nombre}!</div>
            <div className="text-purple-300 text-sm">
              {retosCompletados.length > 0 ? "Explorador Digital" : "Recién llegado"}
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">

        {/* Último logro */}
        {ultimoLogro && (
          <div className="bg-[#EDE9FE] rounded-3xl p-5">
            <div className="text-xs font-black text-[#7C3AED] uppercase tracking-wide mb-3">Último logro desbloqueado</div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center text-3xl shadow-md shrink-0">
                🎮
              </div>
              <div className="flex-1">
                <div className="font-black text-[#7C3AED] text-lg">Explorador Seguro de Roblox</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: Math.min(5, completados.roblox?.aciertos || 0) }).map((_, i) => (
                    <span key={i} className="text-[#F59E0B]">⭐</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowShare(true)}
                className="flex flex-col items-center gap-1 bg-[#7C3AED] text-white px-3 py-2.5 rounded-2xl hover:bg-[#6d28d9] transition-colors"
              >
                <Copy size={16} />
                <span className="text-xs font-bold">Compartir</span>
              </button>
            </div>
          </div>
        )}

        {/* Mis logros */}
        <div className="bg-white rounded-2xl p-4 shadow-sm shadow-purple-100 border border-purple-50">
          <div className="mb-3">
            <span className="font-bold text-gray-700 text-sm">Mis logros</span>
          </div>
          {retosCompletados.length === 0 ? (
            <p className="text-sm text-gray-400">Completa un reto para ganar tu primera insignia 🏅</p>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {retosCompletados.map(([id]) => {
                  const p = CATALOGO.find(c => c.id === id)
                  return (
                    <div key={id} className={`w-8 h-8 rounded-full ${p?.color?.split(" ")[0] || "bg-purple-100"} flex items-center justify-center text-sm border-2 border-white`}>
                      {p?.emoji || "🏅"}
                    </div>
                  )
                })}
              </div>
              <span className="text-sm font-black text-[#7C3AED]">{retosCompletados.length}</span>
              <span className="text-xs text-gray-400">logros desbloqueados</span>
            </div>
          )}
        </div>

        {/* Retos */}
        <div>
          <h2 className="font-black text-[#7C3AED] text-lg mb-3">Retos</h2>
          <div className="space-y-3">
            {plataformasVisibles.map((p) => {
              const completado = completados[p.id]
              return (
                <button
                  key={p.id}
                  onClick={() => p.disponible ? router.push(p.ruta) : null}
                  disabled={!p.disponible}
                  className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm shadow-purple-100 border border-purple-50 hover:shadow-md hover:shadow-purple-100 transition-all text-left disabled:opacity-60 disabled:cursor-default"
                >
                  <div className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center text-2xl shrink-0`}>
                    {p.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-gray-900">{p.nombre}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {completado ? (
                        <span className="text-xs text-gray-400">{completado.aciertos}/{completado.total} correctas</span>
                      ) : (
                        <span className="text-xs text-gray-400">{p.disponible ? "3 retos disponibles" : "Próximamente"}</span>
                      )}
                      {completado && (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">✓ Completado</span>
                      )}
                    </div>
                  </div>
                  {p.disponible && (
                    <div className="bg-[#7C3AED] text-white text-xs font-black px-3 py-1.5 rounded-xl shrink-0">
                      {completado ? "Repetir" : "¡Jugar!"}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Lo que he aprendido */}
        {retosCompletados.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-[#7C3AED]" />
              <h2 className="font-black text-[#7C3AED] text-lg">Lo que he aprendido</h2>
            </div>
            <div className="space-y-3">
              {retosCompletados.map(([id, data]) => {
                const plat = CATALOGO.find(c => c.id === id)
                const isOpen = openLesson === id
                const scenarios = id === "roblox" ? ESCENARIOS_ROBLOX : []
                const acertados = data.tipsDesbloqueados || []
                return (
                  <div key={id} className="bg-white rounded-2xl shadow-sm shadow-purple-100 border border-purple-50 overflow-hidden">
                    <button
                      onClick={() => setOpenLesson(isOpen ? null : id)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className={`w-10 h-10 rounded-xl ${plat?.color} flex items-center justify-center text-xl shrink-0`}>
                        {plat?.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-gray-900">{plat?.nombre}</div>
                        <div className="text-xs text-gray-400">
                          {scenarios.length} preguntas · {data.aciertos} correctas
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-50 divide-y divide-gray-50">
                        {scenarios.map((s, i) => {
                          const correcto = acertados.includes(i)
                          return (
                            <div key={i} className="px-4 py-4">
                              <div className="flex items-start gap-2 mb-2">
                                <CheckCircle
                                  size={15}
                                  className={`shrink-0 mt-0.5 ${correcto ? "text-[#16A34A]" : "text-[#DC2626]"}`}
                                />
                                <p className="text-sm text-gray-600 leading-snug">{s.situacion}</p>
                              </div>
                              <div className={`rounded-xl px-3 py-2 mb-2 text-sm font-semibold ${correcto ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                                {s.respuestaCorrecta}
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed">{s.explicacion}</p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Tips */}
        {tipsVisibles.length > 0 && (
          <button
            onClick={() => setShowTips(true)}
            className="w-full bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl p-4 flex items-center gap-3 hover:bg-amber-100 transition-colors text-left"
          >
            <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-black text-amber-800">Tips desbloqueados</div>
              <div className="text-xs text-amber-600">{tipsVisibles.length} curiosidad{tipsVisibles.length !== 1 ? "es" : ""} ganada{tipsVisibles.length !== 1 ? "s" : ""}</div>
            </div>
            <ChevronRight size={18} className="text-amber-400" />
          </button>
        )}

        {/* Motivador */}
        <div className="bg-[#EDE9FE] rounded-3xl p-5 text-center">
          <div className="text-3xl mb-2">🤖</div>
          <div className="font-black text-[#7C3AED] mb-1">
            {retosCompletados.length > 0 ? `¡Vas genial, ${nombre}!` : `¡Hola, ${nombre}!`}
          </div>
          <p className="text-sm text-purple-600">
            {nextChallenge
              ? `Completa el reto de ${nextChallenge.nombre} para ganar tu próximo logro.`
              : retosCompletados.length > 0
              ? "¡Has completado todos los retos disponibles! Pronto habrá más."
              : "Empieza con el reto de Roblox para ganar tu primera insignia."}
          </p>
        </div>

      </main>

      {/* Modal compartir */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowShare(false)}>
          <div className="bg-white w-full max-w-lg rounded-t-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-black text-gray-900">Compartir logro</span>
              <button onClick={() => setShowShare(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={15} />
              </button>
            </div>

            <div className="mx-4 my-4 rounded-2xl bg-gradient-to-b from-[#7C3AED] to-[#4c1d95] p-5 text-center">
              <div className="text-xs text-purple-300 font-bold uppercase tracking-wide mb-3">Así lo verá tu amigo/a</div>
              <div className={`w-14 h-14 rounded-full ${avatarColor} flex items-center justify-center text-2xl mx-auto mb-2`}>{avatar}</div>
              <p className="text-purple-200 text-xs mb-3">
                <span className="text-white font-black">{nombre}</span> acaba de desbloquear un nuevo logro
              </p>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F59E0B] to-amber-600 flex items-center justify-center mx-auto mb-2 text-3xl shadow-lg">
                🏆
              </div>
              <div className="text-white font-black text-sm mb-1">¡Soy experto/a en Roblox!</div>
              <div className="flex justify-center gap-0.5 mb-3">
                {[1,2,3,4,5].map((i) => <span key={i} className="text-[#F59E0B] text-xs">⭐</span>)}
              </div>
              <div className="bg-[#F59E0B] text-white font-black text-xs px-4 py-2 rounded-xl inline-block">
                ¡Quiero la mía!
              </div>
            </div>

            <div className="px-4 pb-6 space-y-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <span className="flex-1 font-mono text-xs text-gray-500 truncate">
                  {typeof window !== "undefined" ? `${window.location.origin}/insignia/roblox?nombre=${encodeURIComponent(nombre)}` : "safestart.app/insignia/roblox"}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`w-full flex items-center justify-center gap-2 font-black py-4 rounded-2xl transition-colors shadow-lg text-base ${
                  copied ? "bg-[#16A34A] text-white" : "bg-[#7C3AED] text-white hover:bg-[#6d28d9]"
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "¡Enlace copiado!" : "Copiar enlace"}
              </button>
              <button
                onClick={() => { setShowShare(false); router.push(`/insignia/roblox?nombre=${encodeURIComponent(nombre)}`) }}
                className="w-full flex items-center justify-center gap-2 border-2 border-purple-200 text-[#7C3AED] font-bold py-3 rounded-2xl hover:bg-purple-50 transition-colors text-sm"
              >
                <ExternalLink size={15} />
                Ver página completa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal tips */}
      {showTips && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowTips(false)}>
          <div className="bg-white w-full max-w-lg rounded-t-3xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-[#F59E0B]" />
                <span className="font-black text-gray-900">Mis tips desbloqueados</span>
              </div>
              <button onClick={() => setShowTips(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={15} />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 space-y-3">
              {tipsVisibles.map((t, i) => (
                <div key={i} className="bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl p-4 flex gap-3">
                  <span className="text-xl shrink-0">{t.icono}</span>
                  <p className="text-sm text-amber-800 leading-relaxed">{t.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
