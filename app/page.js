"use client"
import { useRouter } from "next/navigation"
import { Brain, ChevronRight, Users, BookOpen, Trophy, Sparkles } from "lucide-react"
import { AppIcon } from "@/components/AppIcon"

const HIJOS_DEMO = [
  { nombre: "Lucía, 9 años", color: "bg-purple-400", plataforma: "Roblox", platColor: "bg-red-400" },
  { nombre: "Marco, 12 años", color: "bg-blue-400", plataforma: "YouTube", platColor: "bg-red-500" },
  { nombre: "Sara, 15 años", color: "bg-green-400", plataforma: "TikTok", platColor: "bg-gray-800" },
]

const FEATURES = [
  { icon: Brain, color: "bg-blue-100 text-[#2563EB]", title: "Educación real", desc: "Retos y escenarios basados en situaciones reales que tus hijos enfrentan en cada plataforma." },
  { icon: Trophy, color: "bg-purple-100 text-[#7C3AED]", title: "Logros desbloqueables", desc: "Logros que se ganan con conocimiento. No puntos abstractos — reconocimiento genuino." },
  { icon: Users, color: "bg-amber-100 text-amber-600", title: "Dos mundos, una familia", desc: "El panel de padres y el de hijos comparten app pero tienen identidades visuales distintas." },
  { icon: BookOpen, color: "bg-green-100 text-green-600", title: "Padres también aprenden", desc: "Guías claras para que entiendas cada plataforma: qué riesgos tiene, cómo configurar la privacidad y qué hablar con tu hijo." },
]

const PASOS = [
  { step: "01", title: "Crea tu cuenta", desc: "Regístrate como padre o madre. Solo necesitas tu correo y una contraseña.", icon: Users },
  { step: "02", title: "Registra a tus hijos", desc: "Añade su nombre, edad y las plataformas que usan. Listo en 2 minutos.", icon: Users },
  { step: "03", title: "Ellos completan retos", desc: "Cada plataforma tiene retos interactivos adaptados a su edad.", icon: BookOpen },
  { step: "04", title: "Tú ves el progreso", desc: "Sigue sus logros, respuestas y nivel de seguridad digital desde tu panel.", icon: Trophy },
]

const PLATAFORMAS = [
  { name: "Roblox", color: "bg-red-100 text-red-600 border-red-200" },
  { name: "YouTube", color: "bg-red-100 text-red-700 border-red-200" },
  { name: "TikTok", color: "bg-gray-100 text-gray-700 border-gray-200" },
  { name: "Instagram", color: "bg-pink-100 text-pink-600 border-pink-200" },
  { name: "WhatsApp", color: "bg-green-100 text-green-600 border-green-200" },
  { name: "Minecraft", color: "bg-lime-100 text-lime-700 border-lime-200" },
  { name: "Discord", color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { name: "Chatbots IA", color: "bg-blue-100 text-blue-600 border-blue-200" },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppIcon size={32} />
            <span className="font-bold text-gray-900 text-lg">SafeStart</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="text-gray-600 font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#2563EB] text-white font-semibold px-5 py-2 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-blue-200"
            >
              Empieza gratis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-b from-[#EFF6FF] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-[#2563EB] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Tu coach digital familiar
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            SafeStart educa,<br />
            <span className="text-[#2563EB]">no restringe</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ayudamos a tus hijos a construir su propio criterio digital.
            No bloqueos, no control. Aprendizaje real para el mundo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="bg-[#2563EB] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-lg shadow-blue-200 text-lg flex items-center justify-center gap-2"
            >
              Empieza gratis
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-blue-300 hover:text-[#2563EB] transition-colors text-lg"
            >
              Ver cómo funciona
            </button>
          </div>
        </div>

        {/* Mockup */}
        <div className="max-w-5xl mx-auto mt-16 px-4">
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100 border border-blue-100 overflow-hidden">
            <div className="bg-[#EFF6FF] px-6 py-4 border-b border-blue-100 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-yellow-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-gray-400">safestart.app/dashboard</div>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {HIJOS_DEMO.map((h) => (
                <div key={h.nombre} className="bg-[#EFF6FF] rounded-2xl p-4">
                  <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white font-bold text-lg ${h.color}`}>
                    {h.nombre[0]}
                  </div>
                  <div className="font-semibold text-gray-800 text-sm">{h.nombre}</div>
                  <div className="flex gap-1 mt-2">
                    <span className={`${h.platColor} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>{h.plataforma}</span>
                  </div>
                  <div className="mt-3 text-xs text-[#2563EB] font-semibold">Ver progreso →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Un enfoque diferente</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Las restricciones no enseñan. El criterio propio sí.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-50 transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="how-it-works" className="py-20 px-4 bg-[#EFF6FF]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Cómo funciona</h2>
          </div>
          <div className="space-y-6">
            {PASOS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm shadow-blue-100">
                <div className="shrink-0 w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-black">
                  {step}
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{title}</div>
                  <div className="text-gray-500 text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plataformas */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Plataformas incluidas</h2>
          <p className="text-gray-500 mb-10">Guías detalladas y retos para cada plataforma</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {PLATAFORMAS.map(({ name, color }) => (
              <span key={name} className={`border ${color} px-4 py-2 rounded-xl font-semibold text-sm`}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#2563EB]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Empieza hoy, gratis</h2>
          <p className="text-blue-200 mb-8 text-lg">Configura en 5 minutos. Sin compromisos.</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-white text-[#2563EB] font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg shadow-lg"
          >
            Crear cuenta gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 text-center text-gray-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <AppIcon size={20} />
          <span className="font-semibold text-gray-700">SafeStart</span>
        </div>
        <p>© 2026 SafeStart · Tu coach digital familiar</p>
      </footer>

    </div>
  )
}
