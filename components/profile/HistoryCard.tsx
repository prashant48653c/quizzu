"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress";

interface HistoryCardProps {
  examNumber: string;
  marks: { total: number; outOf: number };
  correct: { total: number; outOf: number };
  incorrect: { total: number; outOf: number };
  quizTitle: string;
  quizCategory: string;
  timeTaken: number;
  createdAt: string;
}

export default function HistoryCard({
  examNumber,
  marks,
  correct,
  incorrect,
  quizTitle,
  quizCategory,
  timeTaken,
  createdAt,
}: HistoryCardProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-xl font-medium">
            {quizTitle} - {quizCategory}
          </CardTitle>
          <p className="text-sm text-muted-foreground">Exam {examNumber} - {createdAt}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Time Taken</p>
          <p className="text-xl">{formatTime(timeTaken)}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Marks</span>
          </div>
          <ProgressBar
            value={(marks.total / marks.outOf) * 100}
            color="#01805C"
            height="h-2"
          />
          <div className="flex justify-end text-sm">
            <span className="text-[#00000066] font-semibold">
              {marks.total}/{marks.outOf}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Correct</span>
          </div>
          <ProgressBar
            value={(correct.total / correct.outOf) * 100}
            color="#01805C"
            height="h-2"
          />
          <div className="flex justify-end text-sm">
            <span className="text-[#00000066] font-semibold">
              {correct.total}/{correct.outOf}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Incorrect</span>
          </div>
          <ProgressBar
            value={(incorrect.total / incorrect.outOf) * 100}
            color="#FF4D4F"
            height="h-2"
          />
          <div className="flex justify-end text-sm">
            <span className="text-[#00000066] font-semibold">
              {incorrect.total}/{incorrect.outOf}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

