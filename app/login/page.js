"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react"
import { AppIcon } from "@/components/AppIcon"

export default function Login() {
  const router = useRouter()
  const [mode, setMode] = useState("register")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (mode === "forgot") {
      setMode("forgot-sent")
      return
    }
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF] flex flex-col items-center justify-center px-4 font-[Inter,sans-serif]">
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </button>

        <div className="bg-white rounded-2xl shadow-lg shadow-blue-100 p-8 border border-blue-100">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <AppIcon size={36} />
            <span className="font-black text-gray-900 text-xl">SafeStart</span>
          </div>

          {/* Confirmación email enviado */}
          {mode === "forgot-sent" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#16A34A]" />
              </div>
              <h1 className="text-xl font-black text-gray-900 mb-2">Revisa tu correo</h1>
              <p className="text-gray-500 text-sm mb-6">
                Hemos enviado un enlace a <span className="font-semibold text-gray-700">{form.email}</span> para que puedas restablecer tu contraseña.
              </p>
              <p className="text-xs text-gray-400 mb-6">Si no lo ves, revisa la carpeta de spam.</p>
              <button
                onClick={() => setMode("login")}
                className="w-full bg-[#2563EB] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200"
              >
                Volver a iniciar sesión
              </button>
            </div>
          )}

          {/* Recuperar contraseña */}
          {mode === "forgot" && (
            <>
              <button
                onClick={() => setMode("login")}
                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm font-medium mb-6 transition-colors"
              >
                <ArrowLeft size={14} />
                Volver
              </button>
              <h1 className="text-xl font-black text-gray-900 mb-1">¿Olvidaste tu contraseña?</h1>
              <p className="text-gray-500 text-sm mb-6">
                Escribe tu correo y te enviamos un enlace para recuperarla.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2563EB] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200"
                >
                  Enviar enlace de recuperación
                </button>
              </form>
            </>
          )}

          {/* Login / Registro */}
          {(mode === "login" || mode === "register") && (
            <>
              <div className="flex bg-[#EFF6FF] rounded-xl p-1 mb-6">
                {["register", "login"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      mode === m
                        ? "bg-white text-[#2563EB] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {m === "register" ? "Crear cuenta" : "Iniciar sesión"}
                  </button>
                ))}
              </div>

              <h1 className="text-xl font-black text-gray-900 mb-1">
                {mode === "register" ? "Crea tu cuenta de padre/madre" : "Bienvenido/a de nuevo"}
              </h1>
              <p className="text-gray-500 text-sm mb-6">
                {mode === "register"
                  ? "Empieza a acompañar el mundo digital de tus hijos"
                  : "Accede a tu panel familiar"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: María"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      Contraseña
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-[#2563EB] font-semibold hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2563EB] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200 mt-2"
                >
                  {mode === "register" ? "Crear cuenta" : "Entrar"}
                </button>
              </form>

              {mode === "register" && (
                <p className="text-xs text-gray-400 text-center mt-4">
                  Al registrarte aceptas nuestros términos y política de privacidad
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
