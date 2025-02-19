import { Button } from "@/components/ui/button";

import React from "react";

const AboutHero = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center"
      style={{ backgroundImage: "url(/assets/about/aboutHero/background.png)" }}
    >
      <div className=" min-h-[44rem] md:min-h-[39rem] px-5 flex flex-col md:flex-row max-sm:gap-16 gap-10">
        <div className="flex flex-col justify-center">
          <div className="lg:max-w-[40rem] flex flex-col gap-11 ">
            <h2 className="font-medium text-xl sm:text-3xl md:text-4xl text-left font-[Jost]">
              About QUIZU
            </h2>
            <p className="text-[#949494] text-sm sm:text-lg font-[Jost]text-wrap">
              Quizu was born out of a passion for education and a desire to
              bridge the gaps in existing learning platforms. We recognized that
              students needed a more comprehensive, user-friendly, and adaptive
              tool to prepare for their exams and language proficiency tests.
              Thus, Quizu was created to offer a dynamic learning experience
              that combines extensive question banks, personalized
              recommendations, and real-time performance analytics.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button className=" h-14 w-40 text-lg bg-[#95FFE1] rounded-tr-3xl rounded-bl-xl text-black flex items-center justify-center shadow-md transition-all font-bold">
                Start Solving
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            className="w-[96vw] max-w-[390px] h-auto object-contain mx-auto drop-shadow"
            src="/assets/about/aboutHero/main.png"
            alt="About image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
