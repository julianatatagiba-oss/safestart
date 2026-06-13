export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-400">
      <div className="text-center px-8">
        <div className="text-8xl mb-6">🛡️</div>
        <h1 className="text-5xl font-bold text-white mb-4">SafeStart</h1>
        <p className="text-xl text-blue-100 mb-2">El coach digital de tu familia</p>
        <p className="text-blue-200 mb-10 max-w-md mx-auto">
          Aprende junto a tus hijos a navegar de forma segura en YouTube, TikTok, Roblox e Instagram
        </p>
        <a 
          href="/login"
          className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 inline-block"
        >
          Empezar gratis →
        </a>
        <p className="text-blue-200 mt-4 text-sm">Sin tarjeta de crédito · Gratis para siempre</p>
      </div>
    </main>
  )
}