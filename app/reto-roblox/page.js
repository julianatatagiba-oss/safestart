"use client"
import { useState } from "react"

const ESCENARIOS = [
  {
    numero: 1,
    situacion: "Estás jugando en Roblox y un jugador que no conoces te pide que entres a un chat de voz privado para coordinar el juego. Dice que así es más fácil ganar.",
    opciones: [
      { texto: "Entras al chat de voz, parece inofensivo", correcto: false },
      { texto: "Le dices que prefieres el chat de texto del juego", correcto: true },
      { texto: "Le aceptas como amigo y luego decides", correcto: false },
    ],
    feedback: "El chat de voz hace que la conversación se sienta más personal — y es mucho más difícil de moderar. Con desconocidos, el chat del juego es siempre la opción más segura.",
    tip: {
      icono: "💡",
      texto: "Roblox fue creado para que cualquiera pueda hacer sus propios juegos. Muchos desarrolladores profesionales empezaron aquí de pequeños.",
    },
  },
  {
    numero: 2,
    situacion: "Un jugador que acabas de conocer en Roblox te dice que tiene Robux gratis para darte. Solo tienes que añadirle como amigo y decirle tu nombre de usuario.",
    opciones: [
      { texto: "Le añades como amigo y le preguntas cómo conseguirlos", correcto: false },
      { texto: "Ignoras el mensaje — nadie regala Robux gratis", correcto: true },
      { texto: "Le das tu nombre de usuario para verlo", correcto: false },
    ],
    feedback: "Nadie regala Robux gratis. Es una de las estafas más comunes en Roblox: quieren tu nombre de usuario o que les añadas para enviarte más mensajes y pedirte datos.",
    tip: {
      icono: "🚀",
      texto: "El lenguaje de programación de Roblox se llama Lua — el mismo que usan algunos videojuegos AAA profesionales.",
    },
  },
  {
    numero: 3,
    situacion: "Entras a un mundo de Roblox que parece un juego normal, pero dentro hay cosas que te hacen sentir incómodo. Tus amigos dicen que está bien y siguen jugando.",
    opciones: [
      { texto: "Te quedas porque tus amigos están ahí", correcto: false },
      { texto: "Sales del mundo y buscas otro juego", correcto: false },
      { texto: "Reportas el mundo, sales y se lo cuentas a un adulto", correcto: true },
    ],
    feedback: "Si algo te hace sentir incómodo, confía en ese instinto — aunque tus amigos sigan. Reportar ayuda a que ese mundo desaparezca para otros niños. Contárselo a un adulto también.",
    tip: {
      icono: "🤑",
      texto: "Hay creadores de Roblox que ganan más de 1 millón de dólares al año con sus propias experiencias. Algunos empezaron con 10 años.",
    },
  },
]

const ESTADOS = { INTRO: "intro", PREGUNTA: "pregunta", FEEDBACK: "feedback", INSIGNIA: "insignia" }

export default function RetoRoblox() {
  const [estado, setEstado] = useState(ESTADOS.INTRO)
  const [indice, setIndice] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [copiado, setCopiado] = useState(false)

  function compartir() {
    const nombre = localStorage.getItem("ultimoHijo") || "Mi amigo"
    const url = `${window.location.origin}/insignia/roblox?nombre=${encodeURIComponent(nombre)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  const escenario = ESCENARIOS[indice]

  function elegir(opcion, i) {
    if (seleccion !== null) return
    setSeleccion(i)
    if (opcion.correcto) setAciertos(a => a + 1)
    setEstado(ESTADOS.FEEDBACK)
  }

  function siguiente() {
    if (indice + 1 < ESCENARIOS.length) {
      setIndice(indice + 1)
      setSeleccion(null)
      setEstado(ESTADOS.PREGUNTA)
    } else {
      const saved = JSON.parse(localStorage.getItem("retosCompletados") || "{}")
      saved.roblox = true
      localStorage.setItem("retosCompletados", JSON.stringify(saved))
      setEstado(ESTADOS.INSIGNIA)
    }
  }

  if (estado === ESTADOS.INTRO) {
    return (
      <main className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">🎮</div>
            <h1 className="text-3xl font-black text-red-600 mb-2">Reto Roblox</h1>
            <p className="text-gray-500">3 situaciones reales. Tú decides qué hacer.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏅</span>
              <div>
                <p className="font-bold text-gray-700">Al completarlo desbloqueas</p>
                <p className="text-sm text-gray-400">Insignia Explorador Seguro + 3 datos secretos de Roblox</p>
              </div>
            </div>
            <div className="flex gap-2">
              {ESCENARIOS.map((_, i) => (
                <div key={i} className="flex-1 h-2 bg-red-100 rounded-full" />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">3 retos · ~5 minutos</p>
          </div>

          <button
            onClick={() => setEstado(ESTADOS.PREGUNTA)}
            className="w-full bg-red-600 text-white py-4 rounded-2xl text-lg font-bold hover:bg-red-700 active:scale-95 transition-transform"
          >
            Empezar reto →
          </button>

          <a href="/dashboard-hijo" className="block text-center text-gray-400 text-sm mt-4 hover:text-gray-600">
            Volver al dashboard
          </a>
        </div>
      </main>
    )
  }

  if (estado === ESTADOS.INSIGNIA) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl mb-4 animate-bounce">🏅</div>
          <h1 className="text-3xl font-black text-white mb-2">¡Insignia desbloqueada!</h1>
          <p className="text-yellow-100 mb-2 text-lg font-semibold">Explorador Seguro de Roblox</p>
          <p className="text-yellow-200 text-sm mb-8">{aciertos} de {ESCENARIOS.length} decisiones correctas a la primera</p>

          <div className="bg-white rounded-2xl p-6 mb-6 text-left space-y-4">
            <p className="font-bold text-gray-700 text-sm uppercase tracking-wide">Datos que has desbloqueado</p>
            {ESCENARIOS.map((e, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xl">{e.tip.icono}</span>
                <p className="text-sm text-gray-600">{e.tip.texto}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={compartir}
              className="flex-1 bg-white text-orange-500 font-bold py-3 rounded-xl hover:bg-orange-50 transition-all"
            >
              {copiado ? "¡Copiado! ✅" : "Compartir insignia"}
            </button>
            <a
              href="/dashboard-hijo"
              className="flex-1 bg-orange-700 text-white font-bold py-3 rounded-xl hover:bg-orange-800 flex items-center justify-center"
            >
              Ver mi perfil
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-red-50 p-6">
      <div className="max-w-md mx-auto">

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-bold text-red-600">🎮 Roblox</span>
          <div className="flex-1 flex gap-2">
            {ESCENARIOS.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${i <= indice ? "bg-red-500" : "bg-red-100"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">{indice + 1}/{ESCENARIOS.length}</span>
        </div>

        {/* Situación */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-3">
            Situación {escenario.numero}
          </p>
          <p className="text-gray-700 text-base leading-relaxed font-medium">
            {escenario.situacion}
          </p>
        </div>

        {/* Opciones */}
        <div className="space-y-3 mb-4">
          {escenario.opciones.map((opcion, i) => {
            let estilo = "bg-white border-2 border-gray-100 text-gray-700 hover:border-red-300"
            if (seleccion !== null) {
              if (opcion.correcto) estilo = "bg-green-50 border-2 border-green-500 text-green-800"
              else if (seleccion === i) estilo = "bg-red-50 border-2 border-red-400 text-red-800"
              else estilo = "bg-white border-2 border-gray-100 text-gray-400"
            }
            return (
              <button
                key={i}
                onClick={() => elegir(opcion, i)}
                className={`w-full text-left p-4 rounded-xl font-medium transition-all active:scale-98 ${estilo}`}
              >
                <span className="text-gray-400 text-sm mr-2">{["A", "B", "C"][i]}.</span>
                {opcion.texto}
                {seleccion !== null && opcion.correcto && <span className="float-right">✅</span>}
                {seleccion !== null && seleccion === i && !opcion.correcto && <span className="float-right">❌</span>}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {estado === ESTADOS.FEEDBACK && (
          <div className="space-y-3">
            <div className="bg-gray-800 rounded-2xl p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                {ESCENARIOS[indice].opciones[seleccion].correcto ? "✅ Correcto" : "❌ No exactamente"}
              </p>
              <p className="text-white text-sm leading-relaxed">{escenario.feedback}</p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-5">
              <p className="text-xs font-bold text-yellow-600 uppercase tracking-wide mb-2">
                🔓 Dato desbloqueado
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="text-xl mr-2">{escenario.tip.icono}</span>
                {escenario.tip.texto}
              </p>
            </div>

            <button
              onClick={siguiente}
              className="w-full bg-red-600 text-white py-4 rounded-2xl text-lg font-bold hover:bg-red-700 active:scale-95 transition-transform"
            >
              {indice + 1 < ESCENARIOS.length ? "Siguiente →" : "Ver mi insignia 🏅"}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
