"use client"

export default function InsigniaRoblox({ searchParams }) {
  const nombre = searchParams?.nombre || "Tu amigo"

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-400 to-red-500 flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full">

        {/* Badge card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-6">
          <p className="text-gray-400 text-sm mb-4">
            <span className="font-semibold text-gray-600">{nombre}</span> ha conseguido
          </p>

          <div className="text-7xl mb-4">🏅</div>
          <h1 className="text-2xl font-black text-gray-800 mb-1">Explorador Seguro</h1>
          <p className="text-red-500 font-bold mb-6">Roblox · Nivel 1</p>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 text-left">
            <p className="text-xs font-bold text-yellow-600 uppercase tracking-wide mb-2">
              🔓 Un dato que {nombre} ya sabe
            </p>
            <p className="text-sm text-gray-700">
              El lenguaje de programación de Roblox se llama Lua — el mismo que usan algunos videojuegos AAA profesionales.
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            + 2 datos más desbloqueados que tú aún no conoces
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white font-semibold mb-3">¿Quieres conseguir la tuya?</p>
          <a
            href="/"
            className="block w-full bg-white text-red-500 font-black py-4 rounded-2xl text-lg hover:bg-red-50 active:scale-95 transition-transform"
          >
            Consigue tu insignia →
          </a>
          <p className="text-orange-200 text-xs mt-3">
            Gratis · Solo necesitas que tu padre te registre
          </p>
        </div>

      </div>
    </main>
  )
}
