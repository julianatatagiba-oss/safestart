"use client"
import { useEffect, useState } from "react"

const GUIAS = { Roblox: "/guia/roblox" }

export default function Dashboard() {
  const [hijos, setHijos] = useState([])
  const [copiado, setCopiado] = useState(null)
  const [avatares, setAvatares] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem("hijos")
    if (saved) setHijos(JSON.parse(saved))
    const avatar = localStorage.getItem("hijoAvatar")
    const nombre = localStorage.getItem("ultimoHijo")
    if (avatar && nombre) setAvatares({ [nombre]: avatar })
  }, [])

  function copiarEnlace(nombre) {
    const url = `${window.location.origin}/bienvenida-hijo`
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(nombre)
      setTimeout(() => setCopiado(null), 2000)
    })
  }

  return (
    <main className="min-h-screen bg-blue-50">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center mb-6">
        <span className="text-blue-600 font-bold text-lg">🌐 SafeStart</span>
        <button
          onClick={() => { localStorage.clear(); window.location.href = "/" }}
          className="text-gray-500 text-sm hover:text-blue-600"
        >
          Cerrar sesión
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pb-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Bienvenido 👋</h1>
          <p className="text-gray-500 leading-relaxed">
            Aquí puedes aprender sobre las plataformas y juegos que usan tus hijos,
            hacer seguimiento de su aprendizaje en ciberseguridad y estar al día
            de las últimas noticias sobre seguridad digital familiar.
          </p>
        </div>

        {/* Hijos */}
        <h2 className="text-lg font-bold text-gray-700 mb-3">Tus hijos</h2>

        {hijos.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center mb-6">
            <div className="text-4xl mb-3">👨‍👧‍👦</div>
            <p className="text-gray-400 mb-4">Aún no has añadido ningún hijo</p>
            <a href="/dashboard/anadir-hijo" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
              + Añadir hijo
            </a>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {hijos.map((hijo, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">

                {/* Perfil */}
                <div className="flex items-center gap-4 p-5 border-b border-gray-100">
                  <div className="text-4xl">
                    {avatares[hijo.nombre] || (
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl">
                        {hijo.nombre[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-lg">{hijo.nombre}</p>
                    <p className="text-sm text-gray-400">{hijo.edad} años</p>
                  </div>
                  <a
                    href="/dashboard/progreso-hijo"
                    className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-purple-200"
                  >
                    Ver progreso
                  </a>
                </div>

                {/* Plataformas */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Plataformas</p>
                    <a
                      href="/dashboard/anadir-plataformas"
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      + Añadir plataformas
                    </a>
                  </div>
                  {hijo.plataformas.length === 0 ? (
                    <p className="text-sm text-gray-400">No hay plataformas añadidas</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {hijo.plataformas.map(p => {
                        const ruta = GUIAS[p]
                        return ruta ? (
                          <a key={p} href={ruta} className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-1.5 rounded-full hover:bg-blue-100 font-medium">
                            Ver guía: {p} →
                          </a>
                        ) : (
                          <span key={p} className="bg-gray-100 text-gray-500 text-sm px-3 py-1.5 rounded-full">{p}</span>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Enlace de acceso */}
                <div className="p-5">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Enlace de acceso del hijo</p>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-xs text-gray-400 flex-1 truncate">
                      {typeof window !== "undefined" ? `${window.location.origin}/bienvenida-hijo` : "safestart.vercel.app/bienvenida-hijo"}
                    </span>
                    <button
                      onClick={() => copiarEnlace(hijo.nombre)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap"
                    >
                      {copiado === hijo.nombre ? "¡Copiado! ✅" : "📋 Copiar"}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {hijos.length > 0 && (
          <a
            href="/dashboard/anadir-hijo"
            className="block text-center bg-white border-2 border-dashed border-blue-300 text-blue-600 px-6 py-4 rounded-2xl hover:bg-blue-50 font-medium"
          >
            + Añadir otro hijo
          </a>
        )}
      </div>
    </main>
  )
}
