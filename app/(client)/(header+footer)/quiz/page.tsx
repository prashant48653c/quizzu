"use client";
import React from "react";
import SubjectCard from "@/components/client/common/Exam";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import Image from "next/image";
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

interface Category {
  _id: string;
  name: string;
  quizzes: Quiz[];
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  status: string;
  results: number;
  message: string;
  data: {
    categories: Category[];
  };
}

 
const Entrance = () => {
  const { data, isLoading, isError } =  useQuery<CategoryResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosInstance.get('/category');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen">Error loading categories</div>;
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Top Navbar */}
      

      {/* Main Content */}
      <div className="flex flex-col  px-4 py-8 md:py-24 min-h-[80vh] bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <Image
            src="/assets/entrance/quiz.jpg"
            width={300}
            height={175}
            alt="3D illustration of a person working at a standing desk"
            className=" mb-8"
          />

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Explore, Choose, Play And Improve</h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Access thousands of expertly curated questions covering all essential topics. Track your progress and
            identify areas for improvement with our detailed analytics.
          </p>
        </div>
      </div>
    </div>

      {/* Categories Section */}
      <div className="container px-4 py-10 md:py-20">
     {data?.data.categories.map((category) => (
      <div key={category._id} className="mt-10">
      <h2 className="text-2xl md:text-3xl px-12 ml-4 md:ml-14 font-semibold text-black">
         {category.name}
       </h2>
       <div className="flex flex-wrap justify-center items-center gap-12 mt-8">
        {category.quizzes.map((quiz, index) => (
          <SubjectCard
             key={quiz._id}
            _id={quiz._id}
            quizzes={quiz}
            isSpecial={index === 1} // Make middle card special
            specialTextSize={index === 1 ? "text-2xl" : "text-xl"}
          />
         ))}
       </div>
     </div>
    ))}
   </div>
    </section>
  );
};

export default Entrance;