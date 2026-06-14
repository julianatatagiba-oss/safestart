export default function DashboardHijo() {
    return (
      <main className="min-h-screen bg-purple-50 p-6">
        <div className="max-w-md mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🦊</div>
              <div>
                <h1 className="text-xl font-bold text-purple-600">¡Hola, Mateo!</h1>
                <p className="text-gray-400 text-sm">Nivel 1 · 0 insignias</p>
              </div>
            </div>
            <div className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
              0 pts
            </div>
          </div>
  
          {/* Progreso */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <h2 className="font-bold text-gray-700 mb-3">Tu progreso</h2>
            <div className="flex gap-3">
              {["YouTube", "TikTok", "Roblox", "Instagram"].map((plataforma) => (
                <div key={plataforma} className="flex-1 text-center">
                  <div className="bg-purple-50 rounded-xl p-2 mb-1 text-xs text-gray-500">{plataforma}</div>
                  <div className="text-xs text-purple-400">0/3</div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Insignias */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <h2 className="font-bold text-gray-700 mb-3">Tus insignias 🏆</h2>
            <p className="text-gray-400 text-sm">Completa tests para ganar insignias</p>
            <div className="flex gap-2 mt-3">
              {["🔒", "🔒", "🔒", "🔒"].map((insignia, i) => (
                <div key={i} className="text-2xl bg-gray-50 rounded-xl p-3">
                  {insignia}
                </div>
              ))}
            </div>
          </div>
  
          {/* Empezar test */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="font-bold text-gray-700 mb-3">¿Por dónde empezamos?</h2>
            {["YouTube", "TikTok", "Roblox", "Instagram"].map((plataforma) => (
              <div key={plataforma} className="flex items-center justify-between py-3 border-b last:border-0">
                <span className="text-gray-700">{plataforma}</span>
                <button className="bg-purple-600 text-white text-sm px-4 py-1 rounded-full hover:bg-purple-700">
                  Empezar
                </button>
              </div>
            ))}
          </div>
  
        </div>
      </main>
    )
  }