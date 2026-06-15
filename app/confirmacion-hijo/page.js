"use client"
import { useEffect, useState } from "react"

export default function ConfirmacionHijo() {
  const [nombre, setNombre] = useState("")
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const n = localStorage.getItem("ultimoHijo")
    if (n) setNombre(n)
  }, [])

  function copiarLink() {
    const url = `${window.location.origin}/bienvenida-hijo`
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">

        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {nombre ? `¡${nombre} está listo!` : "¡Perfil creado!"}
        </h1>
        <p className="text-gray-500 mb-8">
          Comparte este enlace con tu hijo para que acceda a su perfil
        </p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mb-2">Enlace de acceso</p>
          <p className="text-blue-600 font-medium break-all text-sm">
            {typeof window !== "undefined" ? `${window.location.origin}/bienvenida-hijo` : "safestart.vercel.app/bienvenida-hijo"}
          </p>
        </div>

        <button
          onClick={copiarLink}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 mb-4 transition-all"
        >
          {copiado ? "¡Copiado! ✅" : "📋 Copiar enlace"}
        </button>

        <div className="flex gap-3">
          <a
            href="/dashboard/anadir-hijo"
            className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 text-center"
          >
            + Añadir otro hijo
          </a>
          <a
            href="/dashboard"
            className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 text-center"
          >
            Ir al dashboard
          </a>
        </div>

      </div>
    </main>
  )
}
