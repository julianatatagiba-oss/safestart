"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const SCENARIOS = [
  {
    id: 1,
    situation: "Estás jugando en Roblox y un desconocido te pide tu número de teléfono para \"seguir jugando juntos por WhatsApp\". ¿Qué haces?",
    options: [
      { id: "a", text: "Le doy mi número porque parece simpático", correct: false },
      { id: "b", text: "Le digo que no comparto datos personales y lo reporto", correct: true },
      { id: "c", text: "Le pregunto primero cuántos años tiene", correct: false },
    ],
    explanation: "Nunca compartas información personal con desconocidos online, aunque parezcan amigables. Reportar es siempre la opción correcta.",
    unlockedFact: "¿Sabías que en Roblox puedes bloquear a alguien desde su perfil? Ve a los tres puntos (···) y elige 'Bloquear usuario'.",
  },
  {
    id: 2,
    situation: "Ves un juego de Roblox que cuesta 800 Robux y quieres comprarlo. ¿Cuál es el paso correcto?",
    options: [
      { id: "a", text: "Lo compro directamente, tengo Robux guardados", correct: false },
      { id: "b", text: "Hablo con mis padres antes de gastar Robux", correct: true },
      { id: "c", text: "Le pido a un amigo que me los compre", correct: false },
    ],
    explanation: "Aunque tengas Robux, es importante hablar con tus padres sobre los gastos digitales. El dinero virtual es dinero real.",
    unlockedFact: "800 Robux equivalen aproximadamente a 10€ de dinero real. Acordar un presupuesto mensual con tus padres es una excelente idea.",
  },
  {
    id: 3,
    situation: "En un juego de Roblox, otro jugador te está insultando y diciéndote cosas malas. ¿Qué haces?",
    options: [
      { id: "a", text: "Le insulto de vuelta para que me deje en paz", correct: false },
      { id: "b", text: "Lo ignoro y sigo jugando sin decir nada", correct: false },
      { id: "c", text: "Lo reporto y bloqueo, y le cuento a un adulto si me afecta", correct: true },
    ],
    explanation: "El ciberacoso debe reportarse siempre. Ignorar puede servir a veces, pero reportar es la herramienta que protege a todos.",
    unlockedFact: "Roblox tiene un equipo de moderación 24/7. Cada reporte ayuda a hacer la plataforma más segura para todos.",
  },
]

export default function RetoRoblox() {
  const router = useRouter()
  const [step, setStep] = useState("intro")
  const [isFirstPlay, setIsFirstPlay] = useState(true)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [answers, setAnswers] = useState(SCENARIOS.map(() => ({ selected: null, correct: null })))
  const [showFeedback, setShowFeedback] = useState(false)
  const [nombre, setNombre] = useState("")

  useEffect(() => {
    const n = localStorage.getItem("hijoNombre") || localStorage.getItem("ultimoHijo") || ""
    setNombre(n)
    const saved = JSON.parse(localStorage.getItem("retosCompletados") || "{}")
    setIsFirstPlay(!saved.roblox?.completado)
  }, [])

  const scenario = SCENARIOS[currentScenario]
  const answer = answers[currentScenario]
  const totalCorrect = answers.filter(a => a.correct === true).length

  function handleAnswer(optionId) {
    if (answer.selected) return
    const option = scenario.options.find(o => o.id === optionId)
    const newAnswers = [...answers]
    newAnswers[currentScenario] = { selected: optionId, correct: option.correct }
    setAnswers(newAnswers)
    setShowFeedback(true)
  }

  function handleNext() {
    setShowFeedback(false)
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(currentScenario + 1)
    } else {
      const finalCorrect = answers.filter(a => a.correct === true).length
      const acertados = answers.reduce((arr, a, i) => a.correct ? [...arr, i] : arr, [])
      const saved = JSON.parse(localStorage.getItem("retosCompletados") || "{}")
      saved.roblox = { completado: true, aciertos: finalCorrect, total: SCENARIOS.length, tipsDesbloqueados: acertados }
      localStorage.setItem("retosCompletados", JSON.stringify(saved))

      if (isFirstPlay) {
        setStep("badge-participation")
      } else if (finalCorrect === SCENARIOS.length) {
        setStep("badge-pro")
      } else {
        setStep("badge-fail")
      }
    }
  }

  function resetChallenge() {
    setCurrentScenario(0)
    setAnswers(SCENARIOS.map(() => ({ selected: null, correct: null })))
    setStep("challenge")
  }

  // Intro
  if (step === "intro") {
    return (
      <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif] flex flex-col items-center justify-center px-5">
        <div className="max-w-sm w-full text-center">
          <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-5xl">
            🎮
          </div>
          <div className="bg-[#7C3AED] text-white text-xs font-black px-3 py-1 rounded-full inline-block mb-4">
            RETO · 3 escenarios
          </div>
          <h1 className="text-2xl font-black text-[#7C3AED] mb-3">Reto Roblox</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Vas a enfrentarte a 3 situaciones reales que pueden pasar en Roblox.
            Elige la respuesta correcta y desbloquea datos secretos de la plataforma.
          </p>

          <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl p-4 mb-8 text-left">
            <div className="font-black text-amber-700 mb-1 text-sm">Al completarlo ganas:</div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <span>🏆</span> Logro "Roblox Pro"
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <span>⭐</span> +300 puntos de experiencia
            </div>
          </div>

          <button
            onClick={() => setStep("challenge")}
            className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300 text-lg"
          >
            ¡Empezar reto!
          </button>
          <button
            onClick={() => router.push("/dashboard-hijo")}
            className="w-full mt-3 text-purple-400 font-semibold py-2 text-sm hover:text-purple-600 transition-colors"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    )
  }

  // Primer logro (primera vez)
  if (step === "badge-participation") {
    return (
      <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif] flex flex-col items-center justify-center px-5">
        <div className="max-w-sm w-full text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-[#7C3AED] flex items-center justify-center mx-auto mb-6 text-6xl shadow-2xl shadow-purple-300"
          >
            🌟
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="bg-[#FEF3C7] border-2 border-[#FCD34D] rounded-2xl px-4 py-1.5 inline-block mb-4">
              <span className="font-black text-amber-700">¡Primer logro desbloqueado!</span>
            </div>
            <h1 className="text-3xl font-black text-[#7C3AED] mb-2">Explorador Roblox</h1>
            <p className="text-gray-600 mb-2">
              ¡Has completado tu primer reto! Este logro es tuyo por haberte atrevido a empezar.
            </p>
            <p className="text-sm text-purple-500 mb-6">
              ¿Puedes conseguir el logro <span className="font-black">Roblox Pro</span>? Vuelve a jugar y responde las 3 correctamente.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {SCENARIOS.map((_, i) => (
                <div key={i} className={`rounded-2xl p-3 text-center ${answers[i].correct ? "bg-green-100" : "bg-red-100"}`}>
                  <div className="text-2xl mb-1">{answers[i].correct ? "✅" : "❌"}</div>
                  <div className={`text-xs font-bold ${answers[i].correct ? "text-green-700" : "text-red-600"}`}>Escenario {i + 1}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/dashboard-hijo")}
              className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300"
            >
              Volver al dashboard
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Logro Pro (jugadas posteriores, 3/3)
  if (step === "badge-pro") {
    return (
      <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif] flex flex-col items-center justify-center px-5">
        <div className="max-w-sm w-full text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#F59E0B] to-amber-600 flex items-center justify-center text-6xl shadow-2xl shadow-amber-300">
              🏆
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-4 border-[#F59E0B]/40"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="bg-[#FEF3C7] border-2 border-[#FCD34D] rounded-2xl px-4 py-1.5 inline-block mb-4">
              <span className="font-black text-amber-700">🔓 ¡Logro Pro desbloqueado!</span>
            </div>
            <h1 className="text-3xl font-black text-[#7C3AED] mb-2">Roblox Pro</h1>
            <p className="text-gray-600 mb-6">
              ¡3/3 respuestas correctas! Eres un experto en seguridad de Roblox. 🎉
            </p>
            <button
              onClick={() => router.push(`/insignia/roblox?nombre=${encodeURIComponent(nombre)}`)}
              className="w-full bg-[#F59E0B] text-white font-black py-4 rounded-3xl hover:bg-amber-500 transition-colors shadow-xl shadow-amber-200 mb-3"
            >
              Ver y compartir logro
            </button>
            <button
              onClick={() => router.push("/dashboard-hijo")}
              className="w-full border-2 border-purple-200 text-[#7C3AED] font-bold py-3 rounded-3xl hover:bg-purple-50 transition-colors"
            >
              Volver al dashboard
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  // No todas correctas (jugadas posteriores)
  if (step === "badge-fail") {
    return (
      <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif] flex flex-col items-center justify-center px-5">
        <div className="max-w-sm w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6 relative"
          >
            <span className="text-6xl grayscale opacity-50">🏆</span>
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xl">🔒</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="text-2xl font-black text-gray-700 mb-2">¡Esta vez no!</h1>
            <p className="text-gray-500 mb-2">
              Has acertado <span className="font-black text-[#7C3AED]">{totalCorrect}/3</span> respuestas.
            </p>
            <p className="text-gray-500 mb-6">
              El logro <span className="font-black">Roblox Pro</span> necesita las 3 correctas. ¡Sigue intentándolo!
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {SCENARIOS.map((_, i) => (
                <div key={i} className={`rounded-2xl p-3 text-center ${answers[i].correct ? "bg-green-100" : "bg-red-100"}`}>
                  <div className="text-2xl mb-1">{answers[i].correct ? "✅" : "❌"}</div>
                  <div className={`text-xs font-bold ${answers[i].correct ? "text-green-700" : "text-red-600"}`}>Escenario {i + 1}</div>
                </div>
              ))}
            </div>
            <button
              onClick={resetChallenge}
              className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300 mb-3"
            >
              Volver a intentarlo
            </button>
            <button
              onClick={() => router.push("/dashboard-hijo")}
              className="w-full border-2 border-purple-200 text-[#7C3AED] font-bold py-3 rounded-3xl hover:bg-purple-50 transition-colors"
            >
              Volver al dashboard
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Challenge
  return (
    <div className="min-h-screen bg-[#F5F3FF] font-[Inter,sans-serif]">
      <div className="bg-[#7C3AED] px-5 pt-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push("/dashboard-hijo")}
            className="text-purple-300 text-sm font-medium hover:text-white transition-colors"
          >
            ✕ Salir
          </button>
          <div className="text-white text-sm font-bold">
            {currentScenario + 1} / {SCENARIOS.length}
          </div>
        </div>
        <div className="flex gap-2">
          {SCENARIOS.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i < currentScenario ? "bg-[#F59E0B]" : i === currentScenario ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-white rounded-3xl p-5 shadow-sm shadow-purple-100 border border-purple-50"
          >
            <div className="text-xs font-black text-[#7C3AED] mb-3 uppercase tracking-wide">
              Escenario {currentScenario + 1}
            </div>
            <p className="text-gray-800 leading-relaxed font-medium">{scenario.situation}</p>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isSelected = answer.selected === option.id
            const isAnswered = answer.selected !== null

            let style = "border-2 border-gray-100 bg-white text-gray-700"
            if (isAnswered && isSelected && option.correct) style = "border-2 border-green-400 bg-green-50 text-green-800"
            else if (isAnswered && isSelected && !option.correct) style = "border-2 border-red-400 bg-red-50 text-red-800"
            else if (isAnswered && option.correct) style = "border-2 border-green-200 bg-green-50/50 text-green-700"
            else if (!isAnswered) style = "border-2 border-purple-100 bg-white text-gray-700 hover:border-[#7C3AED] hover:bg-[#F5F3FF]"

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={isAnswered}
                className={`w-full text-left px-4 py-4 rounded-2xl font-semibold text-sm transition-all flex items-center gap-3 ${style}`}
              >
                <span className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-black shrink-0 uppercase text-purple-500">
                  {option.id}
                </span>
                <span className="flex-1">{option.text}</span>
                {isAnswered && isSelected && (
                  option.correct
                    ? <Check size={18} className="text-green-600 shrink-0" />
                    : <X size={18} className="text-red-500 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className={`rounded-2xl p-4 ${answer.correct ? "bg-green-100 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <div className={`font-black mb-1 ${answer.correct ? "text-green-800" : "text-red-700"}`}>
                  {answer.correct ? "¡Correcto! 🎉" : "No exactamente 🤔"}
                </div>
                <p className={`text-sm ${answer.correct ? "text-green-700" : "text-red-600"}`}>
                  {scenario.explanation}
                </p>
              </div>

              {answer.correct && (
                <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl p-4">
                  <div className="font-black text-amber-700 text-sm mb-1">🔓 Dato desbloqueado</div>
                  <p className="text-sm text-amber-700">{scenario.unlockedFact}</p>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full bg-[#7C3AED] text-white font-black py-4 rounded-3xl hover:bg-[#6d28d9] transition-colors shadow-xl shadow-purple-300 flex items-center justify-center gap-2"
              >
                {currentScenario < SCENARIOS.length - 1 ? "Siguiente escenario" : "Ver resultado"}
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
