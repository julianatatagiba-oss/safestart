export default function BienvenidaHijo() {
    return (
      <main className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
          
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-3xl font-bold text-purple-600 mb-2">¡Hola, Mateo!</h1>
          <p className="text-gray-500 mb-8">Tu padre te ha invitado a Navi. Vamos a personalizar tu espacio.</p>
  
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Elige tu avatar</h2>
            <div className="grid grid-cols-4 gap-3">
              {["🦊", "🐼", "🦁", "🐸", "🐧", "🦄", "🐯", "🐙"].map((emoji) => (
                <button 
                  key={emoji}
                  className="text-3xl bg-purple-50 rounded-xl p-3 hover:bg-purple-200"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
  
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Elige tu color favorito</h2>
            <div className="flex justify-center gap-3">
              {["bg-purple-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-red-400", "bg-pink-400"].map((color) => (
                <button 
                  key={color}
                  className={`w-10 h-10 rounded-full ${color} hover:scale-110 transition-transform`}
                />
              ))}
            </div>
          </div>
  
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Tus plataformas</h2>
            <div className="grid grid-cols-2 gap-3">
              {["YouTube", "TikTok", "Roblox", "Instagram"].map((plataforma) => (
                <div key={plataforma} className="bg-purple-50 rounded-xl p-3 text-gray-700 font-medium">
                  {plataforma}
                </div>
              ))}
            </div>
          </div>
  
          <a 
            href="/dashboard-hijo"
            className="bg-purple-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-purple-700 inline-block"
          >
            ¡Empezar! 🚀
          </a>
  
        </div>
      </main>
    )
  }