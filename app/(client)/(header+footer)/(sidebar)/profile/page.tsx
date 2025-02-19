"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgression from "@/components/ui/CircularProgression";
import ProgressBar from "@/components/ui/progress";

export default function Component() {
  const serviceTab = [
    {
      value: 90,
      title: "CREATION",
    },
    {
      value: 80,
      title: "DEVELOPMENT",
    },
    {
      value: 75,
      title: "PRODUCTION",
    },
  ];
 

  return (
 
    <main className="flex-1 p-6 bg-white">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <h1 className="text-2xl font-semibold mb-6">Progress Bar</h1>
          <div className="space-y-6 w-3/4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Physics</span>
                <span className="text-black">19/50</span>
              </div>
              <ProgressBar value={38} height="h-3" color="#01805C" />
              <p className="text-sm text-gray-500">In progress</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>English</span>
                <span className="text-gray-500">0/50</span>
              </div>
              <ProgressBar value={0} height="h-3" color="#01805C" />
              <p className="text-sm text-gray-500">Waiting</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Chemistry</span>
                <span className="text-gray-500">41/50</span>
              </div>
              <ProgressBar value={82} height="h-3" color="#01805C" />
              <p className="text-sm text-gray-500">Doing Well</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {serviceTab.map((x, index) => (
              <div key={index} className="flex flex-col ">
                <div className="text-xl">{x.title}</div>
                <CircularProgression value={x.value} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
