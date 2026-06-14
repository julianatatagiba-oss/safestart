import AnadirHijoForm from "./components/AnadirHijoForm"

export default function AnadirHijo() {
  return (
    <main className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al dashboard
        </a>
        <AnadirHijoForm />
      </div>
    </main>
  )
}
