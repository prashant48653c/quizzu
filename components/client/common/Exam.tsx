"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useRouter } from "next/navigation";

interface SubjectCardProps {
  quizzes: Quiz;
  isSpecial?: boolean;
  specialTextSize?: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  duration: number;
  questions: string[];
  createdAt: string;
  updatedAt: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ quizzes, isSpecial, specialTextSize }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Card
      className={`w-[320px] rounded-xl border shadow-sm transition-transform duration-200 hover:shadow-md flex flex-col relative ${
        isSpecial ? "h-[480px] scale-105" : "h-[420px]"
      }`}
    >
      {/* Green Indicator Line */}
      <div className="bg-[#01805C] h-1 w-1/3 mx-auto rounded-full mt-2"></div>

      {/* Like Button */}
      <button
        className={`absolute top-4 right-4 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
          liked ? "bg-[#01805C] border-[#01805C]" : "bg-white hover:bg-gray-50"
        }`}
        onClick={toggleLike}
      >
        <svg
          className={`w-4 h-4 ${liked ? "text-white" : "text-gray-400"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <img 
            src={quizzes.coverImage} 
            alt={`${quizzes.title} icon`} 
            className="h-20 w-20 object-contain"
          />
        </div>
        <CardTitle className={`text-center ${specialTextSize || 'text-xl'} font-semibold`}>
          {quizzes.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow px-6">
        <div className="space-y-3">
          {quizzes.description.split(',').map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border border-[#01805C] flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-[#01805C]" />
              </div>
              <span className="text-sm text-gray-600">{point}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pb-6 px-6">
        <Button onClick={() => router.push(`/quiz/${quizzes._id}`)}
          className="w-full bg-[#01805C] hover:bg-[#016d4e] text-white rounded-full py-6"
        >
          Play Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;

 