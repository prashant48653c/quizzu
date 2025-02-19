"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Category {
  _id: string;
  name: string;
  totalQuizzes?: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UserStats {
  totalScore: number;
  accuracy: number;
  averageTime: number;
}

interface LeaderboardEntry {
  user: User;
  stats: UserStats;
}

interface CategoryResponse {
  status: string;
  results: number;
  message: string;
  data: {
    categories: Category[];
  };
}

interface LeaderboardResponse {
  status: string;
  results: number;
  data: {
    category: Category;
    leaderboard: LeaderboardEntry[];
  };
}

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch categories
  const { data: categoriesData } = useQuery<CategoryResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosInstance.get('/category/names');
      const data = response.data;
      if (data.data.categories.length > 0 && !selectedCategory) {
        setSelectedCategory(data.data.categories[0]._id);
      }
      return data;
    }
  });

  // Fetch leaderboard data
  const { data: leaderboardData, isLoading } = useQuery<LeaderboardResponse>({
    queryKey: ['leaderboard', selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return null;
      const response = await axiosInstance.get(`/score/leaderboard/${selectedCategory}/10`);
      return response.data;
    },
    enabled: !!selectedCategory
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return "Excellence";
    if (score >= 80) return "Outstanding";
    if (score >= 70) return "Good";
    return "Average";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-none border-0">
      <CardHeader className="pb-0">
        <Tabs 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
          className="w-full "
        >
          <TabsList className="w-full justify-start h-12 bg-transparent  p-1 gap-2">
            {categoriesData?.data.categories.map((category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="rounded-lg data-[state=active]:bg-[#01805C] data-[state=active]:text-white px-6"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">LeaderBoard</h2>
          
          {isLoading ? (
            <div className="p-8 text-center">Loading leaderboard...</div>
          ) : (
            <div className="space-y-4">
              {leaderboardData?.data.leaderboard.map((entry, index) => (
                <div
                  key={entry.user._id}
                  className="flex items-center justify-between py-2 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                      <AvatarFallback>{getInitials(entry.user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{entry.user.name}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-gray-600">
                      {Math.round(entry.stats.accuracy)}%
                    </span>
                    <span className="w-8 text-center">#{index + 1}</span>
                    <span className="text-[#01805C]">
                      {getPerformanceLevel(entry.stats.accuracy)}
                    </span>
                  </div>
                </div>
              ))}
              
              {leaderboardData?.data.leaderboard.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No leaderboard data available for this category yet.
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

