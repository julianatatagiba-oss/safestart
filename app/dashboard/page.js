"use client"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [hijos, setHijos] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("hijos")
    if (saved) setHijos(JSON.parse(saved))
  }, [])

  return (
    <main className="min-h-screen bg-blue-50">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center mb-6">
        <span className="text-blue-600 font-bold text-lg">🌐 SafeStart</span>
        <a href="/" className="text-gray-500 text-sm hover:text-blue-600">Cerrar sesión</a>
      </nav>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Bienvenido 👋</h1>
        <p className="text-gray-600 mb-8">Gestiona la seguridad digital de tu familia</p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Tus hijos</h2>

          {hijos.length === 0 ? (
            <p className="text-gray-400 mb-4">Aún no has añadido ningún hijo</p>
          ) : (
            <div className="mb-4 space-y-3">
              {hijos.map((hijo, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">
                    {hijo.nombre[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{hijo.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {hijo.edad} años
                      {hijo.plataformas.length > 0 ? ` · ${hijo.plataformas.join(", ")}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <a
            href="/dashboard/anadir-hijo"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            + Añadir hijo
          </a>
        </div>
      </div>
    </main>
  )
}
