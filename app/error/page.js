"use client"
import { useRouter } from "next/navigation"

export default function ErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#EFF6FF] font-[Inter,sans-serif] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm shadow-blue-100 text-5xl">
        🤖
      </div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Algo salió mal</h1>
      <p className="text-gray-500 mb-8 max-w-xs">
        No pudimos cargar esta página. Pero no te preocupes, Pixel ya está trabajando en ello.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-[#2563EB] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md shadow-blue-200"
      >
        OK, volver al inicio
      </button>
    </div>
  )
}
