"use client";

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import HistoryCard from "@/components/profile/HistoryCard";
import { useAuthStore } from '@/store/useAuthStore';

// Updated interfaces to match the new API response
interface Score {
  _id: string;
  quiz: {
    _id: string;
    title: string;
    category: {
      name: string;
    };
  };
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  notAnswered: number;
  timeTaken: number;
  createdAt: string;
}

interface APIResponse {
  status: string;
  results: number;
  message: string;
  data: {
    scores: Score[];
  };
}

export default function ScoreHistoryPage() {
  const { userId } = useAuthStore();
  const { data, isLoading, isError, error } = useQuery<APIResponse>({
    queryKey: ['scoreHistory', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID not found');
      const response = await axiosInstance.get(`/score/profile/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="p-4 w-full flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">Loading score history...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 w-full flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">
          Error loading score history: {(error as Error)?.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  if (!data?.data.scores.length) {
    return (
      <div className="p-4 w-full flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">No score history available</div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full space-y-4">
      {data.data.scores.map((score, index) => {
        const totalQuestions = score.correctAnswers + score.wrongAnswers + score.notAnswered;
        
        return (
          <HistoryCard
            key={score._id}
            examNumber={`${String(index + 1).padStart(2, '0')}`}
            marks={{
              total: score.score,
              outOf: totalQuestions
            }}
            correct={{
              total: score.correctAnswers,
              outOf: totalQuestions
            }}
            incorrect={{
              total: score.wrongAnswers,
              outOf: totalQuestions
            }}
            quizTitle={score.quiz.title}
            quizCategory={score.quiz.category.name}
            timeTaken={score.timeTaken}
            createdAt={new Date(score.createdAt).toLocaleDateString()}
          />
        );
      })}
    </div>
  );
}
