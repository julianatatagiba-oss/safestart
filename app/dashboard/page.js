"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, BookOpen, ChevronRight, Bell, User, Link } from "lucide-react"
import { AppIcon } from "@/components/AppIcon"

const PLATFORM_STYLES = {
  Roblox:    { color: "text-red-600",    bg: "bg-red-100" },
  YouTube:   { color: "text-red-700",    bg: "bg-red-100" },
  TikTok:    { color: "text-gray-800",   bg: "bg-gray-100" },
  Instagram: { color: "text-pink-600",   bg: "bg-pink-100" },
  WhatsApp:  { color: "text-green-600",  bg: "bg-green-100" },
  Minecraft: { color: "text-lime-700",   bg: "bg-lime-100" },
  Fortnite:  { color: "text-blue-600",   bg: "bg-blue-100" },
  Twitch:    { color: "text-purple-600", bg: "bg-purple-100" },
  Discord:   { color: "text-indigo-600", bg: "bg-indigo-100" },
  Snapchat:  { color: "text-yellow-600", bg: "bg-yellow-100" },
}

const GUIAS = { Roblox: "/guia/roblox" }

const GUIAS_LISTA = [
  { name: "Roblox",    desc: "Riesgos, compras y configuración",   color: "bg-red-100 text-red-600" },
  { name: "YouTube",   desc: "Contenido, privacidad y comentarios", color: "bg-red-100 text-red-700" },
  { name: "TikTok",    desc: "Algoritmo, privacidad y contactos",   color: "bg-gray-100 text-gray-700" },
  { name: "Instagram", desc: "Privacidad, DMs y contenido",         color: "bg-pink-100 text-pink-600" },
]

const AVATAR_COLORS = ["bg-purple-400", "bg-blue-400", "bg-emerald-400", "bg-orange-400", "bg-rose-400"]

export default function Dashboard() {
  const router = useRouter()
  const [hijos, setHijos] = useState([])
  const [retosCompletados, setRetosCompletados] = useState({})
  const [avatares, setAvatares] = useState({})
  const [copiado, setCopiado] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("hijos")
    if (saved) setHijos(JSON.parse(saved))
    const retos = localStorage.getItem("retosCompletados")
    if (retos) setRetosCompletados(JSON.parse(retos))
    const avatar = localStorage.getItem("hijoAvatar")
    const nombre = localStorage.getItem("ultimoHijo")
    if (avatar && nombre) setAvatares({ [nombre]: avatar })
  }, [])

  const totalRetos = Object.values(retosCompletados).filter(r => r.completado).length
  const totalLogros = totalRetos

  function copiarEnlace(nombre) {
    const url = `${window.location.origin}/bienvenida-hijo`
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(nombre)
      setTimeout(() => setCopiado(null), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF] font-[Inter,sans-serif]">

      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppIcon size={32} />
            <span className="font-black text-gray-900">SafeStart</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <Bell size={16} />
            </button>
            <button
              onClick={() => { localStorage.clear(); router.push("/") }}
              className="w-9 h-9 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] hover:bg-[#2563EB]/20 transition-colors"
            >
              <User size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* Bienvenida */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Hola 👋</h1>
          <p className="text-gray-500 mt-1">Aquí tienes el resumen de tu familia</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Hijos", value: hijos.length, sub: "activos" },
            { label: "Retos", value: totalRetos, sub: "completados" },
            { label: "Logros", value: totalLogros, sub: "desbloqueados" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm shadow-blue-100 border border-blue-50 text-center">
              <div className="text-2xl font-black text-[#2563EB]">{value}</div>
              <div className="text-xs text-gray-500 font-medium">{label} {sub}</div>
            </div>
          ))}
        </div>

        {/* Hijos */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">Mis hijos</h2>
          <button
            onClick={() => router.push("/dashboard/anadir-hijo")}
            className="flex items-center gap-1.5 bg-[#2563EB] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-blue-200"
          >
            <Plus size={15} />
            Añadir hijo
          </button>
        </div>

        {hijos.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm shadow-blue-100 border border-blue-50 mb-10">
            <div className="text-4xl mb-3">👨‍👧‍👦</div>
            <p className="text-gray-400 mb-4">Aún no has añadido ningún hijo</p>
            <button
              onClick={() => router.push("/dashboard/anadir-hijo")}
              className="bg-[#2563EB] text-white px-6 py-3 rounded-xl hover:bg-[#1d4ed8] font-semibold text-sm"
            >
              + Añadir hijo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {hijos.map((hijo, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm shadow-blue-100 border border-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-black text-lg shrink-0`}>
                    {avatares[hijo.nombre] || hijo.nombre[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{hijo.nombre}</div>
                    <div className="text-sm text-gray-400">{hijo.edad} años</div>
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap mb-4">
                  {hijo.plataformas.map((p) => {
                    const style = PLATFORM_STYLES[p] || { color: "text-gray-600", bg: "bg-gray-100" }
                    const ruta = GUIAS[p]
                    return ruta ? (
                      <button
                        key={p}
                        onClick={() => router.push(ruta)}
                        className={`${style.bg} ${style.color} text-xs font-semibold px-2.5 py-1 rounded-lg hover:opacity-80 transition-opacity`}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={p} className={`${style.bg} ${style.color} text-xs font-semibold px-2.5 py-1 rounded-lg opacity-60`}>
                        {p}
                      </span>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => router.push("/dashboard/progreso-hijo")}
                    className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors group"
                  >
                    <span>Ver progreso</span>
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => copiarEnlace(hijo.nombre)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copiar enlace del hijo"
                  >
                    <Link size={13} />
                    {copiado === hijo.nombre ? "¡Copiado!" : "Enlace"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guías */}
        <div>
          <h2 className="text-lg font-black text-gray-900 mb-4">Guías de plataformas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GUIAS_LISTA.map((guide) => {
              const ruta = GUIAS[guide.name]
              return ruta ? (
                <button
                  key={guide.name}
                  onClick={() => router.push(ruta)}
                  className="bg-white rounded-2xl p-4 shadow-sm shadow-blue-100 border border-blue-50 flex items-center gap-4 hover:shadow-md hover:shadow-blue-100 transition-shadow text-left"
                >
                  <div className={`w-10 h-10 rounded-xl ${guide.color} flex items-center justify-center shrink-0`}>
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-sm">{guide.name}</div>
                    <div className="text-xs text-gray-400">{guide.desc}</div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ) : (
                <div
                  key={guide.name}
                  className="bg-white rounded-2xl p-4 shadow-sm shadow-blue-100 border border-blue-50 flex items-center gap-4 opacity-50"
                >
                  <div className={`w-10 h-10 rounded-xl ${guide.color} flex items-center justify-center shrink-0`}>
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-sm">{guide.name}</div>
                    <div className="text-xs text-gray-400">Próximamente</div>
                  </div>
                  <span className="text-xs text-gray-300 font-medium">Pronto</span>
                </div>
              )
            })}
          </div>
        </div>

      </main>
    </div>
  )
}
