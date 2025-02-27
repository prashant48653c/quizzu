"use client";
import SubjectCard from "@/components/client/common/Exam";
import React, { useState } from "react";
 import Navbar from "@/components/client/common/ClientHeader";
// Define types for subject and tab data
type Subject = {
  name: string;
  iconSrc: string;
  topics: string[];
};

type TabData = Record<string, Subject[]>;

export default function StudyMaterial() {
  const [activeTab, setActiveTab] = useState("+2 Entrance Exam");
  
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Tab data with specific types
  const tabData: TabData = {
    "+2 Entrance Exam": [
      {
        name: "Practice Questions",
        iconSrc: "/assets/studyMaterial/images/book.png",
        topics: ["All subjects", "Explanation", "Numerical", "Hints and Tricks"],
      },
      {
        name: "Flash Card",
        iconSrc: "/assets/studyMaterial/images/cards.png",
        topics: ["Each subject", "Formula", "Mnemonic", "Shortcut Notes"],
      },
      {
        name: "Book PDF",
        iconSrc: "/assets/studyMaterial/images/pdf.png",
        topics: ["Past questions", "Notes", "Practice MCQs", "Chapter-based"],
      },
    ],
    "Medical Entrance Exam": [
      {
        name: "Module",
        iconSrc: "/assets/studyMaterial/images/books.png",
        topics: ["All subject", "Explanation", "Numerical", "Hint And Trick"],
      },
      {
        name: "MAT",
        iconSrc: "/assets/studyMaterial/images/chatbot.png",
        topics: ["IQ Based", "Maths", "Tricks", "Short-cut Formulas"],
      },
      {
        name: "Mock Test Solution",
        iconSrc: "/assets/studyMaterial/images/textbook.png",
        topics: ["Past question", "Note", "Practice MCQ", "Chapter-based"],
      },
    ],
  };

  const subjects = tabData[activeTab];

  return (
    <section className="bg-white">
      {/* Button Group */}
      <div className="flex flex-wrap justify-center py-10 px-[10vw] sm:px-[20vw] md:px-[5vw] lg:px-[10vw]">
        <div className="w-full flex flex-col md:flex-row border border-gray-300 rounded-xl overflow-hidden">
          {Object.keys(tabData).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`py-3.5 px-6 text-center w-full text-no ${
                activeTab === tab
                  ? "bg-[#01805C] text-white"
                  : "bg-white text-gray-700"
              } `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-10 flex flex-col md:flex-row justify-center items-center gap-12">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.name}
            quizzes={{
              _id: subject.name.replace(/\s+/g, "-"),
              title: subject.name,
              description: subject.topics.join(", "),
              coverImage: subject.iconSrc,
              duration: 60,
              questions: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }}
            isSpecial={(index + 1) % 3 === 2} // Special content logic (2, 5, 8, ...)
            specialTextSize={(index + 1) % 3 === 2 ? "text-xl" : ""} // Increase text size for special content
          />
        ))}
      </div>
    </section>
  );
}
