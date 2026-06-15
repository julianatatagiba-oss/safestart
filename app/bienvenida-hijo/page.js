"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AVATARES = ["🦊", "🐼", "🦁", "🐸", "🐧", "🦄", "🐯", "🐙"]
const COLORES = ["bg-purple-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-red-400", "bg-pink-400"]

export default function BienvenidaHijo() {
  const router = useRouter()
  const [nombre, setNombre] = useState("Hola")
  const [plataformas, setPlataformas] = useState([])
  const [avatar, setAvatar] = useState(AVATARES[0])
  const [color, setColor] = useState(COLORES[0])

  useEffect(() => {
    const n = localStorage.getItem("ultimoHijo")
    if (n) setNombre(n)
    const p = localStorage.getItem("ultimasPlataformas")
    if (p) setPlataformas(JSON.parse(p))
  }, [])

  function empezar() {
    localStorage.setItem("hijoAvatar", avatar)
    localStorage.setItem("hijoColor", color)
    router.push("/dashboard-hijo")
  }

  return (
    <main className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">

        <div className="text-6xl mb-4">👋</div>
        <h1 className="text-3xl font-bold text-purple-600 mb-2">¡Hola, {nombre}!</h1>
        <p className="text-gray-500 mb-8">Tu padre te ha invitado a SafeStart. Vamos a personalizar tu espacio.</p>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Elige tu avatar</h2>
          <div className="grid grid-cols-4 gap-3">
            {AVATARES.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setAvatar(emoji)}
                className={`text-3xl rounded-xl p-3 transition-all ${avatar === emoji ? "bg-purple-200 ring-2 ring-purple-500 scale-110" : "bg-purple-50 hover:bg-purple-100"}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Elige tu color favorito</h2>
          <div className="flex justify-center gap-3">
            {COLORES.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-full ${c} transition-all ${color === c ? "ring-4 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-110"}`}
              />
            ))}
          </div>
        </div>

        {plataformas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Tus plataformas</h2>
            <div className="grid grid-cols-2 gap-3">
              {plataformas.map((p) => (
                <div key={p} className="bg-purple-50 rounded-xl p-3 text-gray-700 font-medium">
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={empezar}
          className="w-full bg-purple-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-purple-700"
        >
          ¡Empezar! 🚀
        </button>

      </div>
    </main>
  )
}
