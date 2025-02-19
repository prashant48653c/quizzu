"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaCamera } from "react-icons/fa";
import { BookmarkIcon, HelpCircleIcon, HistoryIcon, LogOutIcon, TrophyIcon } from 'lucide-react';
import { UserType } from "@/types/auth";
import useAuthStore from "@/store/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Sidebar = ({ data }: { data: UserType }) => {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const { toast } = useToast();

  const handleLogOut = async () => {
    clearAuth();
    toast({
      title: "Success",
      description: "Logged Out!",
      variant: "default",
      duration: 2000,
    });
    localStorage.removeItem("userId");
    const res = await axiosInstance.get("/user/logout");
    router.push('/');
    return res.data;
  };

  const [profilePic, setProfilePic] = useState("/profile.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleProfilePic = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axiosInstance.patch("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfilePic(response.data.data.user.avatar);
      toast({
        title: "Success",
        description: "Profile picture updated",
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="w-80 bg-white border border-t-0 border-l-0 border-slate-200 p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            alt="Student profile picture"
            className="rounded-full"
            height={100}
            src={data.avatar || "/profile.png"}
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width={100}
          />
          <div
            className="absolute bottom-0 right-0 h-8 w-8 flex items-center justify-center rounded-full bg-[#01805C] border-2 border-white cursor-pointer hover:bg-[#016d4f] transition-colors"
            onClick={handleImageClick}
          >
            <FaCamera className="text-white w-5 h-5" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePic}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="text-center">
          <h2 className="font-semibold">{data.fullname}</h2>
          <p className="text-sm text-gray-500">{data.role}</p>

          <button
            onClick={() => router.push("/profile/update")}
            className="bg-gray-800 text-white px-2 py-1 outline-none rounded-full text-xs"
          >
            Update Profile
          </button>
        </div>
      </div>
      <nav className="space-y-2 mt-20">
        <Link href="/profile/bookmark" className="block">
          <Button
            variant="ghost"
            className="w-full justify-start hover:text-[#48742C] active:text-[#48742C] group"
          >
            <BookmarkIcon className="mr-2 h-4 w-4 text-[#01805C] group-hover:text-[#48742C] group-active:text-[#48742C]" />
            Bookmark
          </Button>
        </Link>
        <Link href="/profile/history" className="block">
          <Button
            variant="ghost"
            className="w-full justify-start hover:text-[#48742C] active:text-[#48742C] group"
          >
            <HistoryIcon className="mr-2 h-4 w-4 text-[#01805C] group-hover:text-[#48742C] group-active:text-[#48742C]" />
            History
          </Button>
        </Link>
        <Link href="/help" className="block">
          <Button
            variant="ghost"
            className="w-full justify-start hover:text-[#48742C] active:text-[#48742C] group"
          >
            <HelpCircleIcon className="mr-2 h-4 w-4 text-[#01805C] group-hover:text-[#48742C] group-active:text-[#48742C]" />
            Help
          </Button>
        </Link>
        <Link href="/profile/leaderboard" className="block">
          <Button
            variant="ghost"
            className="w-full justify-start hover:text-[#48742C] active:text-[#48742C] group"
          >
            <TrophyIcon className="mr-2 h-4 w-4 text-[#01805C] group-hover:text-[#48742C] group-active:text-[#48742C]" />
            Leader Board
          </Button>
        </Link>
        <Link href="/" className="block">
          <Button
            onClick={handleLogOut}
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 group"
          >
            <LogOutIcon className="mr-2 h-4 w-4 group-hover:text-red-600" />
            Log Out
          </Button>
        </Link>
      </nav>
      
    </div>
  );
};

export default Sidebar;

