"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Sparkles } from "lucide-react"
import { AppIcon } from "@/components/AppIcon"

const AVATARS = [
  { id: "star",   emoji: "⭐", bg: "bg-yellow-400" },
  { id: "rocket", emoji: "🚀", bg: "bg-blue-500" },
  { id: "fox",    emoji: "🦊", bg: "bg-orange-400" },
  { id: "cat",    emoji: "😺", bg: "bg-purple-400" },
  { id: "robot",  emoji: "🤖", bg: "bg-teal-400" },
  { id: "dragon", emoji: "🐲", bg: "bg-emerald-500" },
]

const COLORS = [
  { id: "purple",  bg: "bg-[#7C3AED]", ring: "ring-[#7C3AED]" },
  { id: "blue",    bg: "bg-blue-500",   ring: "ring-blue-500" },
  { id: "pink",    bg: "bg-pink-500",   ring: "ring-pink-500" },
  { id: "orange",  bg: "bg-orange-400", ring: "ring-orange-400" },
  { id: "teal",    bg: "bg-teal-500",   ring: "ring-teal-500" },
  { id: "emerald", bg: "bg-emerald-500",ring: "ring-emerald-500" },
]

export default function BienvenidaHijo() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("star")
  const [color, setColor] = useState("purple")

  const selectedAvatar = AVATARS.find((a) => a.id === avatar)
  const selectedColor = COLORS.find((c) => c.id === color)

  function finalizar() {
    localStorage.setItem("hijoAvatar", selectedAvatar.emoji)
    localStorage.setItem("hijoColor", selectedColor.bg)
    if (username.trim()) localStorage.setItem("hijoNombre", username.trim())
    router.push("/dashboard-hijo")
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif] flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <AppIcon size={32} />
          <span className="font-black text-[#7C3AED]">SafeStart</span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-[#7C3AED] w-6" : "bg-purple-200 w-3"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 max-w-sm mx-auto w-full">

        {/* Step 0 — Intro */}
        {step === 0 && (
          <div className="text-center w-full">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="w-32 h-32 rounded-full bg-[#7C3AED] flex items-center justify-center shadow-2xl shadow-purple-300">
                <span className="text-6xl">🤖</span>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles size={18} className="text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-black text-[#7C3AED] mb-3">Hola, soy Pixel</h1>
            <p className="text-gray-600 leading-relaxed mb-2">
              Soy tu copiloto digital. Voy a ayudarte a ser el más listo en internet.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Nada de reglas aburridas — aprenderás con retos reales y ganarás logros de verdad.
            </p>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300 text-lg flex items-center justify-center gap-2"
            >
              ¡Empezar!
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        {/* Step 1 — Nombre + avatar */}
        {step === 1 && (
          <div className="w-full">
            <h1 className="text-2xl font-black text-[#7C3AED] mb-2">¿Cómo te llamas?</h1>
            <p className="text-gray-500 mb-6">Elige el nombre con el que quieres aparecer</p>

            <input
              type="text"
              placeholder="Tu nombre o apodo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-purple-200 rounded-3xl px-5 py-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:border-[#7C3AED] font-bold bg-white mb-6"
              maxLength={20}
            />

            <h2 className="text-lg font-black text-[#7C3AED] mb-3">Elige tu avatar</h2>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAvatar(a.id)}
                  className={`aspect-square rounded-3xl flex items-center justify-center text-4xl transition-all ${a.bg} ${
                    avatar === a.id ? "ring-4 ring-[#7C3AED] ring-offset-2 scale-105" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {a.emoji}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!username.trim()}
              className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300 text-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* Step 2 — Color + misión */}
        {step === 2 && (
          <div className="w-full text-center">
            <div
              className={`w-24 h-24 rounded-full ${selectedColor.bg} flex items-center justify-center mx-auto mb-6 shadow-xl text-5xl`}
            >
              {selectedAvatar.emoji}
            </div>

            <h1 className="text-2xl font-black text-[#7C3AED] mb-1">
              ¡Hola, {username || "explorador"}!
            </h1>
            <p className="text-gray-500 mb-6">Elige tu color favorito</p>

            <div className="flex gap-3 justify-center mb-8">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`w-10 h-10 rounded-full ${c.bg} transition-all ${
                    color === c.id ? `ring-4 ${c.ring} ring-offset-2 scale-110` : "opacity-60 hover:opacity-90"
                  }`}
                />
              ))}
            </div>

            <div className="bg-[#EDE9FE] rounded-3xl p-5 mb-8 text-left">
              <div className="font-black text-[#7C3AED] mb-3 text-sm">Tu misión:</div>
              <div className="space-y-2">
                {[
                  "Completa retos de tus apps favoritas",
                  "Gana logros de experto digital",
                  "Demuestra que sabes más que nadie",
                ].map((m) => (
                  <div key={m} className="flex items-center gap-2 text-sm text-purple-800">
                    <span className="text-[#F59E0B]">★</span>
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={finalizar}
              className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300 text-lg"
            >
              ¡A por ello!
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
