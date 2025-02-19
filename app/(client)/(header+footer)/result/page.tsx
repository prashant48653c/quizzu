import React from "react";
import CircularProgression from "@/components/ui/CircularProgression";
import { Button } from "@/components/ui/button";

const Page = () => {
  const serviceTab = [
    {
      value: 90,
      title: "Score",
    },
    {
      value: 80,
      title: "Accuracy",
    },
    {
      value: 75,
      title: "Time Taken",
    },
    {
      value: 60,
      title: "Attempt",
    },
    {
      value: 50,
      title: "Correct",
    },
    {
      value: 40,
      title: "Incorrect",
    },
  ];

  return (
    <div className="flex flex-col items-center p-5 sm:px-10 ">
      <h1 className="text-3xl font-semibold mb-10">Your Result</h1>

      <div className="flex justify-between max-sm:min-w-[80vw] rounded-xl border-2 border-slate-300 p-8  ">
        <div className=" mx-auto grid grid-cols sm:grid-cols-2 sm:space-x-10 md:grid-cols-3 px-10 gap-10">
          {serviceTab.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xl font-semibold">{item.title}</div>
              <CircularProgression value={item.value} />
            </div>
          ))}
        </div>
      </div>
      <Button size={"lg"} variant={"default"} className="my-12 rounded-xl bg-[#95ffe1]">
        View answer
      </Button>
    </div>
  );
};

export default Page;
