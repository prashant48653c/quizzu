"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Bookmark } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  category: Category;
  coverImage: string;
  duration: number;
}

interface Bookmark {
  _id: string;
  user: string;
  quiz: Quiz | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Bookmark[];
}

export default function StudyPage() {
  const { data: bookmarksResponse, isLoading } = useQuery<ApiResponse>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const response = await axiosInstance.get('/bookmark/me');
      return response.data;
    }
  });

  // Filter out null quizzes and get valid bookmarks
  const validBookmarks = bookmarksResponse?.data.filter(bookmark => bookmark.quiz !== null) || [];

  // Group bookmarks by category
  const bookmarksByCategory = validBookmarks.reduce((acc, bookmark) => {
    const categoryName = bookmark.quiz?.category.name || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(bookmark);
    return acc;
  }, {} as Record<string, Bookmark[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full max-w-7xl mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto py-12 px-4">
  

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(bookmarksByCategory).map(([category, bookmarks]) =>
          bookmarks.map((bookmark) => (
            <Card key={bookmark._id} className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <button className="absolute right-4 top-4 text-[#01805C]">
                <Heart fill="green" className="w-5 h-5" />
              </button>
              <CardHeader className="space-y-4 text-center">
                <div className="w-32 h-32 mx-auto">
                  <img
                    src={bookmark.quiz?.coverImage}
                    alt={bookmark.quiz?.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <CardTitle className="text-2xl font-bold">{bookmark.quiz?.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {bookmark.quiz?.description}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {bookmark.quiz?.duration} mins
                  </div>
                  <div className="flex items-center">
                    <Bookmark className="w-4 h-4 mr-1" />
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-[#01805C] hover:bg-[#016d4e] text-white font-medium py-2 rounded-md"
                >
                  Explore Now
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

