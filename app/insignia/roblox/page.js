"use client"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ChevronRight } from "lucide-react"
import { AppIcon } from "@/components/AppIcon"

function InsigniaContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nombre = searchParams.get("nombre") || "Tu amigo"

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7C3AED] to-[#4c1d95] font-[Inter,sans-serif] flex flex-col items-center justify-center px-5 py-12">
      <div className="max-w-sm w-full text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <AppIcon size={28} />
          <span className="font-black text-white">SafeStart</span>
        </div>

        {/* Anuncio */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl shadow-purple-900/40">
            ⭐
          </div>
          <p className="text-purple-200 text-sm font-medium">
            <span className="text-white font-black text-lg">{nombre}</span> acaba de desbloquear un nuevo logro
          </p>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-44 h-44 mb-8"
        >
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-[#F59E0B] to-amber-600 flex flex-col items-center justify-center shadow-2xl shadow-purple-900/60">
            <div className="text-5xl mb-1">🏆</div>
            <div className="text-white font-black text-xs tracking-widest uppercase">Roblox Pro</div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border-4 border-[#F59E0B]/30"
          />
        </motion.div>

        {/* Mensaje */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-2xl font-black text-white mb-2">
            ¡{nombre} es experto/a en Roblox!
          </h1>
          <p className="text-purple-200 text-sm leading-relaxed mb-2">
            Ha completado el reto de seguridad digital de Roblox en SafeStart y ha aprendido a protegerse online.
          </p>
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
                className="text-[#F59E0B] text-2xl"
              >
                ⭐
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white/10 rounded-3xl p-5 mb-5">
            <p className="text-white font-black text-base mb-1">
              ¿Quieres ganar tu propio logro?
            </p>
            <p className="text-purple-200 text-sm mb-4">
              Pídele a tu padre o madre que te registre en SafeStart. ¡Es gratis!
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-[#F59E0B] text-white font-black py-4 rounded-2xl hover:bg-amber-500 transition-colors shadow-xl shadow-amber-900/30 flex items-center justify-center gap-2 text-base"
            >
              ¡Quiero la mía!
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="text-purple-400 text-xs">
            safestart.app · Tu coach digital familiar
          </p>
        </motion.div>

      </div>
    </div>
  )
}

export default function InsigniaRoblox() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#7C3AED] to-[#4c1d95] flex items-center justify-center">
        <div className="text-white text-lg font-black">Cargando...</div>
      </div>
    }>
      <InsigniaContent />
    </Suspense>
  )
}
