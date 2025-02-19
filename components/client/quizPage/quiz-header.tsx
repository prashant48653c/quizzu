interface QuizHeaderProps {
  title: string
  session: string
}

export function QuizHeader({ title, session }: QuizHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#01805C]">{title}</h1>
      <p className="text-sm text-[#00000080]">{session}</p>
    </div>
  )
}

