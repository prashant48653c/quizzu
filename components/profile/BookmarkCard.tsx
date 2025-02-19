"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudyCardProps {
  title: string;
  iconSrc: string;
  features: string[];
}

export default function StudyCard({ title, iconSrc, features = [] }: StudyCardProps) {
  const router = useRouter();

  const handleExplore = () => {
    // Navigate based on card type
    if (title.toLowerCase().includes('module')) {
      router.push('/modules');
    } else {
      router.push('/mock-tests');
    }
  };

  return (
    <Card className="w-[320px] h-[532px] flex flex-col rounded-none border-t-0 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="h-2 bg-[#01805C] w-1/3 mx-auto rounded-full mb-4" />
      <CardHeader className="pb-2">
        <div className="flex justify-center">
          <img src={iconSrc} alt={`${title} icon`} className="h-16 w-16" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardTitle className="text-xl font-semibold text-center mb-4">{title}</CardTitle>
        <ul className="space-y-2 border border-gray-200 flex flex-col rounded-lg p-4 mb-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500 shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-2">
        <Button 
          onClick={handleExplore}
          className="w-full bg-[#01805C] rounded-full hover:bg-[#016d4e] text-white"
        >
          Explore Now
        </Button>
      </CardFooter>
    </Card>
  );
}