export default function LoginForm() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Bienvenido a SafeStart</h1>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input type="email" placeholder="tu@email.com" className="w-full border border-gray-300 rounded-lg px-4 py-2"/>
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Contraseña</label>
        <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2"/>
      </div>
      <a
        href="/dashboard"
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 block text-center"
      >
        Registrarse
      </a>
      <p className="text-center text-gray-500 mt-4">
        ¿Ya tienes cuenta?{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">Inicia sesión</span>
      </p>
    </div>
  )
}
