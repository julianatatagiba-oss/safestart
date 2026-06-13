export default function Dashboard() {
    return (
      <main className="min-h-screen bg-blue-50 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Hola, mamá/papá 👋</h1>
          <p className="text-gray-600 mb-8">Gestiona la seguridad digital de tu familia</p>
  
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tus hijos</h2>
            <p className="text-gray-400 mb-4">Aún no has añadido ningún hijo</p>
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