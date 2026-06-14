export default function AnadirHijoForm() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Añadir hijo</h1>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Nombre de tu hijo"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Edad</label>
        <input
          type="number"
          placeholder="Edad"
          min="7"
          max="16"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 mb-2">Plataformas que usa</label>
        <div className="grid grid-cols-2 gap-3">
          {["Instagram", "YouTube", "TikTok", "Roblox"].map((plataforma) => (
            <label key={plataforma} className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100">
              <input type="checkbox" className="w-4 h-4 accent-blue-600"/>
              <span className="text-gray-700">{plataforma}</span>
            </label>
          ))}
        </div>
      </div>

      <a
        href="/dashboard"
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 block text-center"
      >
        Guardar
      </a>
    </div>
  )
}
