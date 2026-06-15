"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown, AlertTriangle, Settings, CreditCard, Newspaper, ShieldCheck } from "lucide-react"

const SECTIONS = [
  {
    id: "risks",
    icon: AlertTriangle,
    iconColor: "text-amber-600 bg-amber-100",
    title: "Riesgos principales",
    content: [
      { subtitle: "Contacto con desconocidos", text: "En Roblox, los jugadores pueden enviar solicitudes de amistad y mensajes privados. Los menores pueden ser contactados por adultos que se hacen pasar por niños." },
      { subtitle: "Contenido inapropiado", text: "Aunque Roblox tiene filtros, algunos juegos creados por usuarios pueden contener violencia, lenguaje inapropiado o referencias adultas." },
      { subtitle: "Adicción al juego", text: "El sistema de recompensas de Roblox está diseñado para mantener a los jugadores en la plataforma. Es importante establecer límites de tiempo claros." },
    ],
  },
  {
    id: "config",
    icon: Settings,
    iconColor: "text-blue-600 bg-blue-100",
    title: "Configuración recomendada",
    content: [
      { subtitle: "Cuenta restringida", text: "Activa el modo de cuenta restringida en Ajustes > Privacidad > Restricciones de cuenta. Limita el acceso solo a juegos curados." },
      { subtitle: "Mensajes privados", text: "Ve a Configuración > Privacidad > ¿Quién puede enviarme mensajes? y selecciona 'Nadie' o 'Amigos'." },
      { subtitle: "PIN parental", text: "Configura un PIN en Ajustes > Seguridad para que no puedan cambiar la configuración de privacidad sin tu permiso." },
    ],
  },
  {
    id: "purchases",
    icon: CreditCard,
    iconColor: "text-green-600 bg-green-100",
    title: "Compras dentro de la app",
    content: [
      { subtitle: "¿Qué es Robux?", text: "Robux es la moneda virtual de Roblox. Se compra con dinero real y se usa para comprar accesorios, avatares y ventajas en juegos." },
      { subtitle: "Cómo controlarlo", text: "Activa la verificación de contraseña en Ajustes > Seguridad. También puedes desactivar la tarjeta de crédito guardada." },
      { subtitle: "Límites mensuales", text: "Considera establecer un límite mensual de Robux como propina digital, explicando que es un presupuesto fijo." },
    ],
  },
  {
    id: "news",
    icon: Newspaper,
    iconColor: "text-purple-600 bg-purple-100",
    title: "Noticias recientes",
    content: [
      { subtitle: "Nueva política de edad (2025)", text: "Roblox lanzó verificación de edad para acceder a contenido para mayores de 17 años. Los menores están automáticamente excluidos con filtros más estrictos." },
      { subtitle: "Actualizaciones de seguridad", text: "El sistema de moderación incorporó IA en tiempo real para detectar y bloquear contenido inapropiado en chats y juegos con mayor precisión." },
    ],
  },
  {
    id: "conversation",
    icon: ShieldCheck,
    iconColor: "text-emerald-600 bg-emerald-100",
    title: "Cómo hablar con tu hijo",
    content: [
      { subtitle: "Preguntas para empezar", text: "¿A qué juegos juegas más? ¿Hay alguien que te haya pedido información personal? ¿Cómo te sentiste cuando...?" },
      { subtitle: "Sin dramatizar", text: "No prohibas de golpe — explica los riesgos con ejemplos concretos. La prohibición genera ocultamiento; la conversación genera criterio." },
    ],
  },
]

export default function GuiaRoblox() {
  const router = useRouter()
  const [openSection, setOpenSection] = useState("risks")

  return (
    <div className="min-h-screen bg-[#EFF6FF] font-[Inter,sans-serif]">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-black text-sm">R</span>
            </div>
            <div>
              <h1 className="font-black text-gray-900 leading-tight">Guía Roblox</h1>
              <p className="text-xs text-gray-400">Para padres · Actualizada jun 2026</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Intro card */}
        <div className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 font-black text-xl flex-shrink-0">
              R
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">¿Qué es Roblox?</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Plataforma de creación de juegos usada principalmente por menores de 16 años.
                Permite crear, compartir y jugar mundos virtuales. Es gratuita pero incluye
                compras en la aplicación.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-lg">7–16 años</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg">Social</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-lg">Compras</span>
          </div>
        </div>

        {/* Accordion sections */}
        <div className="space-y-3">
          {SECTIONS.map(({ id, icon: Icon, iconColor, title, content }) => (
            <div key={id} className="bg-white rounded-2xl shadow-sm shadow-blue-100 border border-blue-50 overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === id ? null : id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${iconColor} flex items-center justify-center`}>
                    <Icon size={17} />
                  </div>
                  <span className="font-bold text-gray-900">{title}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${openSection === id ? "rotate-180" : ""}`}
                />
              </button>

              {openSection === id && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <div className="space-y-4 pt-4">
                    {content.map(({ subtitle, text }) => (
                      <div key={subtitle}>
                        <div className="font-semibold text-gray-800 text-sm mb-1">{subtitle}</div>
                        <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-[#EDE9FE] rounded-2xl p-5 text-center">
          <div className="font-bold text-[#7C3AED] mb-1">¿Tu hijo ya completó el reto de Roblox?</div>
          <p className="text-sm text-purple-600 mb-4">Puede ganar el logro "Roblox Pro" completando 3 escenarios</p>
          <button
            onClick={() => router.push("/dashboard-hijo")}
            className="bg-[#7C3AED] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#6d28d9] transition-colors text-sm"
          >
            Ver panel del hijo/a
          </button>
        </div>
      </main>
    </div>
  )
}
