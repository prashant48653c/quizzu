"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useRouter } from "next/navigation";

// Define both interfaces to handle both use cases
interface Subject {
  name: string;
  iconSrc: string;
  topics: string[];
}

interface Quiz {
  _id: string;
  title: string;
  name?: string;
  description: string;
  coverImage: string;
  duration: number;
  questions: string[];
  createdAt: string;
  updatedAt: string;
}

interface SubjectCardProps {
  quizzes?: Quiz;
  subject?: Subject;
  isSpecial?: boolean;
  specialTextSize?: string;
  _id?: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ quizzes, subject, isSpecial, specialTextSize }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  // Determine if we're using a subject or a quiz
  const isSubject = !!subject;
  
  // Set display variables based on what was passed
  const title = isSubject ? subject.name : quizzes?.title || "";
  const imageSrc = isSubject ? subject.iconSrc : quizzes?.coverImage || "";
  const imageAlt = isSubject ? `${subject.name} icon` : `${quizzes?.title} icon`;
  
  // Handle description/topics display
  const displayPoints = isSubject 
    ? subject.topics 
    : quizzes?.description?.split(',') || [];

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
            src={imageSrc} 
            alt={imageAlt} 
            className="h-20 w-20 object-contain"
          />
        </div>
        <CardTitle className={`text-center ${specialTextSize || 'text-xl'} font-semibold`}>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow px-6">
        <div className="space-y-3">
          {displayPoints.map((point, index) => (
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
        <Button 
          onClick={() => {
            if (quizzes && quizzes._id) {
              router.push(`/quiz/${quizzes._id}`);
            }
          }}
          className="w-full bg-[#01805C] hover:bg-[#016d4e] text-white rounded-full py-6"
        >
          {isSubject ? "Explore Subject" : "Play Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;