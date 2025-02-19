import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Sign Up & Create Your Profile",
    description:
      "Embark on your learning journey by creating a personalized profile. This will serve as your digital hub, allowing you to track your progress, set goals, and customize your learning experience.",
    additionalInfo:
      "By providing essential information, you'll gain access to tailored recommendations and resources that align with your individual needs and preferences.",
    image: "assets/homePage/learningJourney/video/journey1.mp4",
  },
  {
    id: 2,
    title: "Choose Your Exam or Language Goal",
    description:
      "Select the specific exam or language proficiency goal that aligns with your aspirations. Our tailored resources and expert guidance will help you achieve your desired level of fluency.",
    additionalInfo:
      "Master engineering and medical entrance exams, Excel in Korean language proficiency with our comprehensive MCQ platform.",
    image: "assets/homePage/learningJourney/video/journey2.mp4",
  },
  {
    id: 3,
    title: "Take Diagnostic Quizzes",
    description:
      "Before you dive into your exam preparation, it's essential to assess your current knowledge and identify areas where you may need to focus extra effort.",
    additionalInfo:
      "Our diagnostic quizzes are designed to provide you with a comprehensive evaluation of your understanding of key concepts and topics.",
    image: "assets/homePage/learningJourney/video/journey3.mp4",
  },
  {
    id: 4,
    title: "Track Your Progress & Achieve Your Goals",
    description:
      "By setting clear goals, you can gain a comprehensive understanding of your strengths and weaknesses, set tailored goals, and track your progress effectively.",
    additionalInfo:
      "This personalized approach will empower you to achieve your academic and language-learning aspirations.",
    image: "assets/homePage/learningJourney/video/journey1.mp4",
  },
];

export default function LearningJourney() {
  return (
    <section className=" py-16">
      <div className="flex flex-col px-4 sm:px-20">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-[#1F1F1F] text-center sm:text-left">
          Learning Journey
        </h2>
        <div className="flex flex-col justify-center items-center gap-16">
          {steps.map((step, index) => (
            <Card key={step.id} className=" border-none shadow-none">
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }
                justify-around gap-x-8`}
              >
                <CardContent className="flex-1 p-6 ">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-start gap-1.5">
                      <span className="font-bold text-xl rounded-full px-2 bg-[#95FFE1] flex items-center py-[0.5px]">
                        {step.id}
                      </span>
                      <CardTitle className="text-[#1F1F1F] text-xl">
                        {step.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardDescription className="text-base mb-6 text-[#949494]">
                    {step.description}
                  </CardDescription>
                  <p className="text-base text-[#949494]">
                    {step.additionalInfo}
                  </p>
                </CardContent>
                <div className="flex-1  cursor-pointer overflow-hidden">
                  <video
                    src={step.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className=" rounded-xl"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
