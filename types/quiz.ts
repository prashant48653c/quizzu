export interface Quiz {
  _id: string
  title: string
  description: string
  duration: number
  category: {
    _id: string
    name: string
  }
  questions: Array<{
    _id: string
    questionTitle: string
    options: string[]
    correct_option: string
  }>
}

export interface QuizResponse {
  status: string
  message: string
  data: {
    quiz: Quiz
  }
}

export interface Question {
  id: string
  text: string
  options: string[]
}

export interface QuestionStatuses {
  [key: string]: {
    attempted?: boolean
    markedForReview?: boolean
  }
}

// components/question-card.tsx
interface QuestionCardProps {
  question: Question
  selectedAnswer?: string
  onAnswerSelect: (answer: string) => void
  duration: number
  onTimeUp?: () => void
}