import { cn } from "@/lib/utils";
import { QuestionStatuses } from "@/types/quiz";
interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  questionStatuses: QuestionStatuses;
  onQuestionSelect: (questionNumber: number) => void;
}

export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  questionStatuses,
  onQuestionSelect,
}: QuestionNavigatorProps) {
  return (
    <div className="w-full px-2">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
          const status = questionStatuses[num] || {
            attempted: false,
            markedForReview: false,
          };
          return (
            <button
              key={num}
              onClick={() => onQuestionSelect(num)}
              className={cn(
                "h-8 w-8 rounded-full text-sm font-medium transition-colors",
                num === currentQuestion &&
                  "ring-2 ring-[#01805C] ring-offset-2",
                status.attempted && "bg-[#01805C] text-white",
                status.markedForReview && "bg-[#0B436D] text-white",
                !status.attempted &&
                  !status.markedForReview &&
                  "bg-gray-200 text-gray-600"
              )}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
}
