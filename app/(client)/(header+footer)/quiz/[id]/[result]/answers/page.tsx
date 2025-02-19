'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { QuizHeader } from "@/components/client/quizPage/quiz-header"
import { QuestionNavigator } from "@/components/client/quizPage/question-navigator"
import { NavigationControls } from "@/components/client/quizPage/navigation-controls"
import { Legend } from "@/components/client/quizPage/legend"
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Card } from "@/components/ui/card"
import { Check, X } from 'lucide-react'

interface SelectedOption {
  question: string
  option: string
}

interface ScoreResponse {
  status: string
  message: string
  data: {
    score: {
      _id: string
      selected_options: SelectedOption[]
      quiz: {
        title: string
        category: {
          name: string
        }
        questions: {
          _id: string
          questionTitle: string
          options: string[]
          correct_option: string
        }[]
      }
    }
  }
}

const ReviewQuestionCard = ({ 
  question, 
  userSelectedOption, 
  correctOption 
}: { 
  question: {
    questionTitle: string
    options: string[]
  }
  userSelectedOption?: string
  correctOption: string
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{question.questionTitle}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = userSelectedOption === option
            const isCorrect = correctOption === option

            let optionStyle = "border-gray-200"
            if (isSelected && isCorrect) {
              optionStyle = "border-green-500 bg-green-50"
            } else if (isSelected && !isCorrect) {
              optionStyle = "border-red-500 bg-red-50"
            } else if (isCorrect) {
              optionStyle = "border-green-500 bg-green-50"
            }

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${optionStyle}`}
              >
                <div className="flex-grow">{option}</div>
                {isSelected && (
                  isCorrect ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )
                )}
                {!isSelected && isCorrect && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

export default function QuizReviewLayout() {
  const params = useParams()
  const scoreId = params.result as string
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const { data, isLoading } = useQuery<ScoreResponse>({
    queryKey: ["score-answers", scoreId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/score/${scoreId}`)
      return response.data
    },
  })

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading answers...</div>
  }

  const score = data?.data.score
  if (!score) return null

  const questions = score.quiz.questions
  const currentQuestion = questions[currentQuestionIndex]
  const userSelectedOption = score.selected_options.find(
    option => option.question === currentQuestion._id
  )?.option

  // Create question statuses for navigation
  const questionStatuses = questions.reduce((acc, question) => {
    const isAttempted = score.selected_options.some(opt => opt.question === question._id)
    acc[question._id] = { attempted: isAttempted, markedForReview: false }
    return acc
  }, {} as Record<string, { attempted: boolean, markedForReview: boolean }>)

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <QuizHeader 
        title={score.quiz.title} 
        session={score.quiz.category.name} 
      />
      
      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        <div>
          {currentQuestion && (
            <ReviewQuestionCard
              question={currentQuestion}
              userSelectedOption={userSelectedOption}
              correctOption={currentQuestion.correct_option}
            />
          )}
          
          <NavigationControls
            onPrevious={() => setCurrentQuestionIndex((prev) => prev - 1)}
            onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
            hasPrevious={currentQuestionIndex > 0}
            hasNext={currentQuestionIndex < questions.length - 1}
          />
          
          <div className="mt-6">
            <p className="text-xl font-semibold text-[#00000080]">
              {currentQuestionIndex + 1} of {questions.length} questions
            </p>
          </div>
        </div>
   
        <div className="order-first lg:order-none">
          <QuestionNavigator
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex + 1}
            questionStatuses={questionStatuses}
            onQuestionSelect={(index) => setCurrentQuestionIndex(index - 1)}
          />
        </div>
        
        <div className="mt-6">
          <Legend />
        </div>
      </div>
    </div>
  )
}