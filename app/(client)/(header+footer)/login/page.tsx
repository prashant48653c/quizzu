'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import LoginForm from "@/components/client/auth/LoginForm";
import RegisterForm from "@/components/client/auth/RegisterForm";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [activeTab, setActiveTab] = useState("login");

  const handleGoogleAuth = () => {
    console.error(process.env.NEXT_PUBLIC_API_BASE_URL)
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/google`;
  }

  return (
    <div className="min-h-screen w-full sm:place-content-center">
      <main className="max-sm:mt-[13vw] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-6 text-center">
            <Image
              width={200}
              height={50}
              src="/assets/logo.png"
              alt="Quizu Logo"
              className="mx-auto"
            />

            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
              Explore, learn, and challenge yourself
            </h1>
            <p className="text-stone-400 text-sm sm:text-md px-4 text-center">
              Quizu was created to offer a dynamic learning experience that
              combines extensive question banks, personalized recommendations,
              and real-time performance analytics
            </p>               
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Button
              onClick={handleGoogleAuth}
              variant={"outline"}
              size={"lg"}
              className="gap-2 rounded-full py-2 w-64 place-content-center"
            >
              <FaGoogle className="mr-2 h-5 w-5 text-black fill-black" />
              Sign up with Google
            </Button>
          </div>

          <div className="text-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center space-y-4 px-8">
            <p className="text-sm sm:text-md text-semibold text-muted-foreground">
              By {activeTab === "login" ? "logging in" : "creating an account"}, you accept the Quizu{" "}
              <Link href="#" className="text-[#005AD1] hover:underline">
                terms and conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#005AD1] hover:underline">
                privacy policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

