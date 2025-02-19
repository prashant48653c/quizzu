"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/useAuthStore";
import axiosInstance from "@/lib/axiosInstance";

// Define types for the Navbar items
interface NavbarItem {
  id: number;
  title: string;
  path: string;
}

const NavbarMenu: NavbarItem[] = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About", path: "/about" },
  { id: 4, title: "Study Material", path: "/studymaterial" },
  { id: 5, title: "News", path: "/news" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string>("Home");
  const { token } = useAuthStore();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isExactQuizPage = pathname === "/quiz";
  const isProfilePage = pathname.startsWith("/profile");
  const [userInfo, setUserInfo] = useState<any>();

  const getUser = async () => {
    try {
      const user = await axiosInstance.get(`user/me`);
    setUserInfo(user.data.data.user)
    console.log(user.data.data.user)
    } catch (error) {
      console.log("Not loggined !",error)
    }
    
  };

  useEffect(() => {
    const activeItem = NavbarMenu.find((menu) => menu.path === pathname)?.title;
    if (activeItem) {
      setActiveMenu(activeItem);
    }
    if(!userInfo){
      getUser();
    }
  }, [pathname]);

  return (
    <nav className="min-h-28 sticky flex justify-between items-center max-sm:gap-5 px-2 sm:px-10 md:px-12">
      {/* Logo section */}
      <div>
        <Link href={"/"}>
          <Image
            width={130}
            height={50}
            src="/assets/logo.png"
            alt="Quizu Logo"
          />
        </Link>
      </div>

      {/* Menu section */}
      {!isExactQuizPage && !pathname.startsWith("/quiz/") && (
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className="nav-menu inline mr-8">
                <Link
                  href={menu.path}
                  className={`relative pb-1 text-lg ${
                    menu.title === activeMenu
                      ? "font-bold text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveMenu(menu.title)}
                >
                  {menu.title}
                  {menu.title === activeMenu && (
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search bar and notification for exact quiz page */}
      {isExactQuizPage && (
        <div className="flex-grow flex items-center justify-center space-x-4">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              3
            </span>
          </Button>
        </div>
      )}

      {/* Profile or Register button */}
      <div className="flex gap-2 sm:gap-8 items-center">
        {token && !isProfilePage ? (
          <Link href={"/profile"}>
            <div className="flex gap-1 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
      <Image
        src={userInfo?.avatar || '/favicon.ico'}
        width={54}
        height={54}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>
            
              <div className="hidden sm:block">
                <p className="font-semibold">{userInfo?.fullname}</p>
                <p className="text-sm text-gray-500">{userInfo?.role}</p>
              </div>
            </div>
          </Link>
        ) : !token && !isAuthPage ? (
          <Link href={"/login"}>
            <Button className="rounded-xl bg-[#95FFE1] text-md sm:p-5">
              Register
            </Button>
          </Link>
        ) : null}

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu size={24} />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              {NavbarMenu.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.path}
                  className={`text-lg ${
                    menu.title === activeMenu
                      ? "font-bold text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => setActiveMenu(menu.title)}
                >
                  {menu.title}
                </Link>
              ))}
              {!token && !isAuthPage && (
                <Link href="/login">
                  <Button className="w-full mt-4">Register</Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

