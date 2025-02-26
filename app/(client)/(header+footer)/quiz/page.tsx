"use client";
import React from "react";
import SubjectCard from "@/components/client/common/Exam";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

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

export const useCategories = () => {
  return useQuery<any>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosInstance.get('/category');
      return response.data;
    }
  });
};

const Entrance = () => {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen">Error loading categories</div>;
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="top-0 left-0 w-full flex items-center justify-between bg-white px-5 py-4 z-50">
        {/* Navbar content */}
      </header>

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center px-4 mt-20 md:mt-28"
        style={{
          backgroundImage: 'url("/Ellipse 34-2.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      >
        <img
          src="/Group 88.png"
          alt="Hero Illustration"
          className="w-[600px] h-[475px]"
        />
      </div>

      {/* Categories Section */}
      <div className="container px-4 py-10 md:py-20">
  {data?.data.categories.map((category) => (
    <div key={category._id} className="mt-10">
      <h2 className="text-2xl md:text-3xl ml-4 md:ml-14 font-semibold text-black">
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