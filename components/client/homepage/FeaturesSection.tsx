'use client'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  vdoSrc: string;
}

const features: Feature[] = [
  {
    title: "Extensive MCQ Repository",
    description: "Access thousands of expertly curated questions covering all essential topics.",
    vdoSrc: "assets/homePage/featuresSection/videos/feature1.mp4",
  },
  {
    title: "Personalized Learning",
    description: "Benefit from adaptive learning algorithms that tailor quizzes to your strengths and weaknesses.",
    vdoSrc: "assets/homePage/featuresSection/videos/feature2.mp4",
  },
  {
    title: "Real-Time Analytics",
    description: "Track your progress and identify areas for improvement with our detailed analytics.",
    vdoSrc: "assets/homePage/featuresSection/videos/feature3.mp4",
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-background py-16 px-3  sm:px-20">
      <div className="">

      <div className="flex flex-col ">
        <h2 className="text-3xl font-bold tracking-tight px-6  text-[#1F1F1F] mb-8 text-center sm:text-left">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className=" max-w-80 border-none shadow-none ">
              <CardHeader>
                <video
                  src={feature.vdoSrc}
                  className=" w-full rounded-xl mb-3"
                  muted
                  autoPlay
                  loop
                  
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0; // Reset video to the beginning
                  }}
                ></video>
                <CardTitle className="text-[#1F1F1F] text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#949494]">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Features;

