import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Timer } from "./client/quizPage/timer"
import { Question } from "@/types/quiz"

interface QuestionCardProps {
  question: Question
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  duration: number
  onTimeUp: () => void  // Added this prop definition
}

export function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  duration,
  onTimeUp 
}: QuestionCardProps) {
  return (
    <div className="relative rounded-lg border p-6">
      <div className="absolute left-1/2 top-3 -translate-x-1/2">
        <Timer initialMinutes={duration} onTimeUp={onTimeUp} />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg px-3 text-[#00000080] font-medium">Question</h2>
      </div>
      <p className="mb-4 border p-2 rounded-xl px-3 text-lg">{question.text}</p>

      <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect} className="space-y-3">
        {question.options.map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2 rounded-lg p-2"
          >
            <RadioGroupItem 
              value={option} 
              id={option}
              className={cn(
                "",
                "data-[state=checked]:bg-[#01805C] data-[state=checked]:border-[#01805C] checked:bg-[#01805C]"
              )}
            />
            <Label htmlFor={option} className="w-full cursor-pointer">
              {option}  
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}