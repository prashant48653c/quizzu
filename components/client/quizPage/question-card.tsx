import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Timer } from "./timer";
import { Question } from "@/types/quiz";
interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col rounded-lg gap-3 border p-6 w-full">
      <div className="mx-auto">
        <Timer initialMinutes={9} />
      </div>
      <h2 className="text-lg px-3 text-[#00000080] font-medium">
        Question {question.id}
      </h2>
      <span className="w-full mb-4 border p-2 rounded-xl px-3 text-lg">
        {question.text}
      </span>
      <RadioGroup
        value={selectedAnswer}
        onValueChange={onAnswerSelect}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <div
            key={option}
            className="flex items-center space-x-2 rounded-lg  p-2"
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
  );
}
