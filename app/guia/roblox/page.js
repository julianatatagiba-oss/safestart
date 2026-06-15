"use client"
import { useState } from "react"

const RIESGOS = [
  {
    icono: "🎙️",
    titulo: "Chat de voz con desconocidos",
    descripcion: "Es el riesgo más inmediato. Las conversaciones de voz son más personales y difíciles de moderar que el chat de texto.",
  },
  {
    icono: "🎭",
    titulo: "Contenido inapropiado disfrazado",
    descripcion: "Hay experiencias con contenido violento o sexual diseñadas para parecer juegos inofensivos.",
  },
  {
    icono: "💸",
    titulo: "Compras con Robux",
    descripcion: "Mecánicas de monetización agresivas. Los niños pueden gastar dinero real sin ser conscientes del valor.",
  },
  {
    icono: "👤",
    titulo: "Solicitudes de desconocidos",
    descripcion: "Adultos que usan Roblox para contactar menores y ganarse su confianza progresivamente (grooming).",
  },
]

const CONFIGURACION = [
  {
    paso: 1,
    accion: "Vincula tu cuenta de padre",
    detalle: "Sin vincular, tu hijo puede cambiar su propia configuración de seguridad en cualquier momento.",
    critico: true,
  },
  {
    paso: 2,
    accion: "Activa las restricciones de cuenta",
    detalle: "Configuración → Seguridad → Restricciones de cuenta. Limita el chat a lista de amigos aprobados.",
    critico: true,
  },
  {
    paso: 3,
    accion: "Desactiva el chat de voz",
    detalle: "Imprescindible para menores de 12. Configuración → Privacidad → Chat de voz → Desactivar.",
    critico: true,
  },
  {
    paso: 4,
    accion: "Configura el chat solo para amigos",
    detalle: "Para menores de 10, desactívalo completamente. Para 10-12, solo amigos verificados.",
    critico: false,
  },
  {
    paso: 5,
    accion: "Bloquea las compras integradas",
    detalle: "Desactiva la opción de comprar Robux desde el perfil del hijo o añade PIN parental en la tienda.",
    critico: false,
  },
  {
    paso: 6,
    accion: "Revisa la sección 'Recientes' cada semana",
    detalle: "Muestra en qué mundos ha estado tu hijo. Es la forma más rápida de detectar experiencias inapropiadas.",
    critico: false,
  },
]

const NOTICIAS = [
  {
    titulo: "INCIBE alerta sobre riesgos de grooming en plataformas de gaming para menores",
    fuente: "INCIBE",
    fecha: "Mayo 2026",
    url: "https://www.incibe.es/menores",
  },
  {
    titulo: "Roblox implementa verificación biométrica de edad para adaptar la configuración automáticamente",
    fuente: "Roblox Blog",
    fecha: "Enero 2026",
    url: "https://blog.roblox.com",
  },
  {
    titulo: "Qustodio 2025: los niños pasan una media de 2h17min diarios en Roblox desde escritorio",
    fuente: "Qustodio",
    fecha: "Diciembre 2025",
    url: "https://www.qustodio.com",
  },
]

function Seccion({ titulo, children, defaultOpen = false }) {
  const [abierto, setAbierto] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-bold text-gray-700">{titulo}</span>
        <span className="text-gray-400 text-lg">{abierto ? "▲" : "▼"}</span>
      </button>
      {abierto && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}

export default function GuiaRoblox() {
  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto">

        <a href="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al dashboard
        </a>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">🎮</span>
            <div>
              <h1 className="text-2xl font-black text-gray-800">Roblox</h1>
              <p className="text-gray-500 text-sm">Guía de seguridad para padres</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Plataforma de juegos y creación muy popular entre niños de 6 a 12 años.
            Los usuarios juegan experiencias creadas por otros jugadores o crean las suyas propias.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-red-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-red-500">70M+</p>
              <p className="text-xs text-gray-400">usuarios activos diarios</p>
            </div>
            <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-orange-500">6-12</p>
              <p className="text-xs text-gray-400">años de uso habitual</p>
            </div>
            <div className="flex-1 bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-yellow-600">2h17m</p>
              <p className="text-xs text-gray-400">al día en escritorio</p>
            </div>
          </div>
        </div>

        {/* Riesgos */}
        <Seccion titulo="⚠️ Riesgos principales" defaultOpen={true}>
          <div className="space-y-3">
            {RIESGOS.map((r, i) => (
              <div key={i} className="flex gap-3 p-3 bg-red-50 rounded-xl">
                <span className="text-2xl shrink-0">{r.icono}</span>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">{r.titulo}</p>
                  <p className="text-gray-500 text-sm mt-1">{r.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </Seccion>

        {/* Configuración */}
        <Seccion titulo="⚙️ Configuración de seguridad">
          <div className="space-y-3">
            {CONFIGURACION.map((c) => (
              <div key={c.paso} className={`flex gap-3 p-3 rounded-xl ${c.critico ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${c.critico ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                  {c.paso}
                </div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    {c.accion}
                    {c.critico && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Prioritario</span>}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{c.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </Seccion>

        {/* Compras */}
        <Seccion titulo="💳 Compras integradas">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-2 p-3 bg-yellow-50 rounded-xl">
              <span className="shrink-0">💰</span>
              <p><strong>Robux</strong> es la moneda virtual de Roblox. Se compra con dinero real y se usa para acceder a objetos, avatares y experiencias de pago.</p>
            </div>
            <div className="flex gap-2 p-3 bg-yellow-50 rounded-xl">
              <span className="shrink-0">🛒</span>
              <p>Los niños pueden hacer compras desde el juego si la cuenta tiene saldo o un método de pago guardado. <strong>Desactiva esto desde la configuración de tu cuenta.</strong></p>
            </div>
            <div className="flex gap-2 p-3 bg-yellow-50 rounded-xl">
              <span className="shrink-0">🔒</span>
              <p>Puedes añadir un <strong>PIN parental</strong> para que cualquier compra requiera tu autorización.</p>
            </div>
          </div>
        </Seccion>

        {/* Noticias */}
        <Seccion titulo="📰 Noticias recientes">
          <div className="space-y-3">
            {NOTICIAS.map((n, i) => (
              <a
                key={i}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-gray-700 text-sm mb-1">{n.titulo}</p>
                <p className="text-xs text-gray-400">{n.fuente} · {n.fecha}</p>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Más recursos en <a href="https://www.incibe.es/menores" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">incibe.es/menores</a>
          </p>
        </Seccion>

      </div>
    </main>
  )
}
