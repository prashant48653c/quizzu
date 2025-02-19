import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookmarkPlus } from "lucide-react";

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onReview: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  onReview,
  hasPrevious,
  hasNext,
}: NavigationControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between max-sm:gap-7 mt-5">
      <div className="max-sm:w-full gap-3 flex justify-between ">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="rounded-full text-[#00000080]"
        >
          <ArrowLeft className="mr-2 text-[#00000080] h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!hasNext}
          className="bg-[#01805C]  text-white hover:bg-[#01805C]/90 rounded-full"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex w-full justify-end">
        <Button
          variant="secondary"
          onClick={onReview}
          className="bg-[#0B436D] text-white hover:bg-[#0B436D]/90 rounded-full"
        >
          <BookmarkPlus className="mr-2 h-4 w-4" />
          Review
        </Button>
      </div>
    </div>
  );
}
