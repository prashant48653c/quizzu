"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
 
import CircularProgression from "@/components/ui/CircularProgression"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/lib/axiosInstance"

interface ScoreResponse {
  status: string
  message: string
  data: {
    score: {
      _id: string
      score: number
      correctAnswers: number
      wrongAnswers: number
      notAnswered: number
      timeTaken: number
      user: {
        fullname: string
        avatar: string
      }
      quiz: {
        title: string
        questions: Array<any>
      }
    }
  }
}

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const scoreId = params.result as string
  const quizId = params.id as string

  const { data, isLoading } = useQuery<ScoreResponse>({
    queryKey: ["score", scoreId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/score/${scoreId}`)
      return response.data
    },
  })

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading results...</div>
  }

  const score = data?.data.score
  if (!score) return null

  const totalQuestions = score.quiz.questions.length
  const accuracy = (score.correctAnswers / totalQuestions) * 100

  const metrics = [
    {
      value: score.score,
      title: "Score",
      color: "#01805C"
    },
    {
      value: Math.round(accuracy),
      title: "Accuracy",
      unit: "%",
      color: "#01805C"
    },
    {
      value: score.timeTaken,
      title: "Time Taken",
      unit: " MIN",
      color: "#01805C"
    },
    {
      value: totalQuestions - score.notAnswered,
      title: "Attempt",
      color: "#01805C"
    },
    {
      value: score.correctAnswers,
      title: "Correct",
      color: "#01805C"
    },
    {
      value: score.wrongAnswers,
      title: "Incorrect",
      color: "#D1D5DB"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-center mb-10">Your Result</h1>

        <div className="max-w-4xl mx-auto bg-white rounded-xl border shadow-sm">
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {metric.title}
                  </h2>
                  <CircularProgression
                    value={metric.value}
                    unit={metric.unit}
                    color={metric.color}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => router.push(`/quiz/${quizId}/${scoreId}/answers`)}
                className="bg-[#00FFB9] hover:bg-[#00FFB9]/90 text-black rounded-full px-8 py-6 text-lg font-medium"
              >
                View Answer
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
