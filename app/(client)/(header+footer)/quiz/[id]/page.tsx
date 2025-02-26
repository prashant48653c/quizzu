'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { QuizHeader } from "@/components/client/quizPage/quiz-header"
import { QuestionNavigator } from "@/components/client/quizPage/question-navigator"
import { QuestionCard } from "@/components/question-card"
import { NavigationControls } from "@/components/client/quizPage/navigation-controls"
import { Legend } from "@/components/client/quizPage/legend"
// import { useQuiz, useSubmitScore } from "@/hooks/useQuiz"
import { QuestionStatuses } from "@/types/quiz"
// import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { QuizResponse } from '@/types/quiz';



export default function QuizLayout() {

  const useQuiz = (quizId: string) => {
    return useQuery<QuizResponse>({
      queryKey: ['quiz', quizId],
      queryFn: async () => {
        const response = await axiosInstance.get(`/quiz/${quizId}`);
        return response.data;
      },
    });
  };
  
   const useSubmitScore = () => {
    return useMutation({
      mutationFn: async (data: any) => {
        const response = await axiosInstance.post('/score/submit', data);
        return response.data;
      },
    });
  };
  const params = useParams()
  const router = useRouter()
  // const { toast } = useToast()
  const quizId = params.id as string
  
  const { data, isLoading, isError } = useQuiz(quizId)
  const submitScore = useSubmitScore()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatuses>({})
  const [startTime] = useState<number>(Date.now())

  const questions = data?.data.quiz.questions || []
  const currentQuestion = questions[currentQuestionIndex]

   

  const handleAnswerSelect = (answer: string) => {
    if (!currentQuestion) return

    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: answer }))
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestion._id]: { ...prev[currentQuestion._id], attempted: true }
    }))
  }

  const handleReview = () => {
    if (!currentQuestion) return

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQuestion._id]: { ...prev[currentQuestion._id], markedForReview: true }
    }))
  }

  const handleSubmit = async () => {
    if (!data?.data.quiz) return
  
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
  
    const selectedOptions: any[] = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }))
   
  
    try {
      const response = await submitScore.mutateAsync({
        user: "677f670e713a757e41a7788a",
        quiz: quizId,
        selectedOptions,
        timeTaken
      })
  
      // Redirect to the result page with the score ID
      router.push(`/quiz/${quizId}/${response.data.score._id}`)
    } catch (error) {
      console.error('Failed to submit quiz:', error)
    }
  }
  const handleTimeUp = async () => {
    // Automatically submit the quiz when time is up
    await handleSubmit();
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading quiz...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen">Error loading quiz</div>
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <QuizHeader 
        title={data?.data.quiz.title || ''} 
        session={data?.data.quiz.category.name || ''} 
      />
      
      <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
        <div>
        {currentQuestion && (
  <QuestionCard
    question={{
      id: currentQuestion._id,
      text: currentQuestion.questionTitle,
      options: currentQuestion.options,
    }}
    selectedAnswer={answers[currentQuestion._id]}
    onAnswerSelect={handleAnswerSelect}
    duration={data?.data.quiz.duration || 20}
    onTimeUp={handleTimeUp}
  />
)}
          
          <NavigationControls
            onPrevious={() => setCurrentQuestionIndex((prev) => prev - 1)}
            onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
            onReview={handleReview}
            hasPrevious={currentQuestionIndex > 0}
            hasNext={currentQuestionIndex < questions.length - 1}
          />
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xl font-semibold text-[#00000080]">
              {currentQuestionIndex + 1} of {questions.length} questions
            </p>
            <Button 
              onClick={handleSubmit} 
              className="bg-[#01805C] rounded-full text-md px-6 text-white hover:bg-[#01805C]/90"
              disabled={submitScore.isPending}
            >
              {submitScore.isPending ? 'Submitting...' : 'Submit'}
            </Button>
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
