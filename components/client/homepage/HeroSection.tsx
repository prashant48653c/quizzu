"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const testOptions = ["Language Test", "License Exam", "Entrance Exam"];

export default function HeroSection() {
  const [testType, setTestType] = useState(testOptions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestType((prev) => {
        const currentIndex = testOptions.indexOf(prev);
        return testOptions[(currentIndex + 1) % testOptions.length];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col bg justify-around items-center min-h-screen bg-cover bg-center bg-no-repeat px-5 md:px-10">
      <div className="grid min-h-[650px] grid-cols-1 md:grid-cols-2">
        {/* Brand info */}
        <div className="relative z-20 flex flex-col justify-center py-10 md:py-0">
          <div className="relative space-y-10 text-center md:text-left lg:max-w-[600px]">
            <h1 className="text-2xl text-[#1F1F1F] font-semibold lg:text-5xl">
              Ace your{" "}
              <span className="text-transparent bg-gradient-to-r from-[#47564A] to-[#008767] bg-clip-text">
                {testType}
              </span>{" "}
              with our Practice Test
            </h1>
            <h6 className="text-[#949494] text-xl">
              Master Engineering and medical entrance exams, Excel in Korean
              language proficiency with our comprehensive MCQ platform.
            </h6>
            <div className="flex justify-center md:justify-start">
              <div className="flex justify-center md:justify-start">
                <button className="bg-[#95ffe1] p-3 px-6 rounded-xl flex gap-4 items-center ">
                  Start Solving
                  <div className=" bg-[#00EFAB] rounded-full">
                    <ArrowRight className="p-1" size={28} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* HeroSection Image */}
        <div className="flex items-center justify-center">
          <img
            className="relative z-10"
            src="/assets/homePage/heroSection/main.png"
            alt="Welcome to Quizu"
          />
        </div>
      </div>
    </section>
  );
}
