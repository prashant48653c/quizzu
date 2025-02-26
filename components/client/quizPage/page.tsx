"use client";
import React from "react";
import SubjectCard from "@/components/client/common/Exam";

type Subject = {
  name: string;
  iconSrc: string;
  topics: string[];
};

const Entrance = () => {
  const tabData: Record<string, Subject[]> = {
    "+2 Entrance Exam": [
      {
        name: "Physics",
        iconSrc: "/assets/entrance/physics.png",
        topics: ["Past questions", "Memory base", "Explanation", "Numerical"],
      },
      {
        name: "Maths",
        iconSrc: "/assets/entrance/math.png",
        topics: [
          "Past questions",
          "Formula",
          "Explanation",
          "Topic-wise question",
        ],
      },
      {
        name: "English",
        iconSrc: "/assets/entrance/english.png",
        topics: ["Past questions", "Grammar", "Pronunciation", "Chapter-based"],
      },
    ],
    "Medical Entrance Exam": [
      {
        name: "Zoology",
        iconSrc: "/assets/entrance/zoology.png",
        topics: [
          "Past questions",
          "Memory base",
          "Explanation",
          "Reason-based",
        ],
      },
      {
        name: "Botany",
        iconSrc: "/assets/entrance/botany.png",
        topics: [
          "Past questions",
          "Drawing based",
          "Explanation",
          "Topic wise question",
        ],
      },
      {
        name: "Chemistry",
        iconSrc: "/assets/entrance/chemistry.png",
        topics: ["Past questions", "Numerical", "Give reason", "Reactions"],
      },
    ],
    "Engineering Entrance Exam": [
      {
        name: "Maths",
        iconSrc: "/assets/entrance/math.png",
        topics: ["Past questions", "Reason-based", "Explanation", "Hints"],
      },
      {
        name: "Physics",
        iconSrc: "/assets/entrance/physics.png",
        topics: [
          "Explanation",
          "Topic-based",
          "Past questions",
          "Memory-based",
        ],
      },
      {
        name: "Chemistry",
        iconSrc: "/assets/entrance/chemistry.png",
        topics: ["Reactions", "Numerical", "Theory"],
      },
    ],
    "IELTS Exam": [
      {
        name: "Module",
        iconSrc: "/assets/entrance/module.png",
        topics: [
          "All subjects",
          "Explanation",
          "Numerical",
          "Hints and Tricks",
        ],
      },
      {
        name: "MAT",
        iconSrc: "/assets/entrance/mat.png",
        topics: ["IQ Based", "Maths", "Tricks", "Short-cut Formulas"],
      },
      {
        name: "Mock Test Solution",
        iconSrc: "/assets/entrance/mock_test_solution.png",
        topics: ["Past questions", "Notes", "Practice MCQs", "Chapter-based"],
      },
    ],
  };

  return (
    <section className="flex flex-col items-center justify-center gap-16 bg-white mt-3">
      {/* Top Navbar */}
      <div className="mx-auto mt-2">
        <div className="relative w-full ">
          <div className="absolute inset-2.5 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M15.5 10.5a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for quiz"
            className="w-[90vw] sm:w-[50vw] h-full px-4 pl-9 py-2 rounded-full border border-gray-300 focus:ring focus:ring-blue-300 text-md"
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col items-center justify-center px-10 -translate-y-8"
        style={{
          backgroundImage: 'url("/assets/entrance/blurBg.png")',
          backgroundSize: "cover", // Ensures the image covers the container
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-10">
          <img
            src="/assets/entrance/main.png"
            alt="Hero Illustration"
            className="w-full h-auto mx- max-w-[28rem]"
          />
          <span className="font-semibold text-3xl text-center">
            Explore, Choose, Play And Improve{" "}
          </span>
          <div className="hidden sm:flex sm:flex-col">
            <span className="font-semibold text-md text-center">
              Access thousands of expertly curated questions covering all
              <br />
              essential topics.Track your progress and identify
              <br /> areas for improvement with our
              <br /> detailed analytics.{" "}
            </span>
          </div>
          <div className="flex flex-col sm:hidden ">
            <span className="font-semibold text-md text-center">
              Access thousands of expertly curated questions covering all
              essential topics.Track your progress and identify areas for
              improvement with our detailed analytics.{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-4 py-10 md:py-20">
        {Object.keys(tabData).map((examName) => (
          <div key={examName} className="mt-10">
            <h2 className="text-2xl md:text-3xl ml-4 md:ml-14 font-semibold text-black">
              {examName}
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              {tabData[examName].map((subject, index) => (
                <SubjectCard
                  key={subject.name}
                  name={subject.name}
                  iconSrc={subject.iconSrc}
                  topics={subject.topics}
                  isSpecial={(index + 1) % 3 === 2} // Special content logic (2, 5, 8, ...)
                  specialTextSize={(index + 1) % 3 === 2 ? "text-xl" : ""} // Increase text size for special content
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
