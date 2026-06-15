export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Algo ha ido mal</h1>
        <p className="text-gray-500 mb-8">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
        <a
          href="/"
          className="block w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700"
        >
          OK
        </a>
      </div>
    </main>
  )
}
