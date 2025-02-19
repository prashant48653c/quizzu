import Image from "next/image";

const WhySection = () => {
  // Card data
  const cardData = [
    {
      id: 1,
      icon: "/assets/about/whySection/why1.png",
      title: "Mission",
      description:
        "Dimensional coverage of all questions related to a particular topic.",
      bgColor: "bg-green-500",
    },
    {
      id: 2,
      icon: "/assets/about/whySection/why2.png",
      title: "Vision",
      description:
        "Plenty of subjects to choose from, for example, Computer languages, Engineering subjects, etc.",
      bgColor: "bg-blue-500",
    },
    {
      id: 3,
      icon: "/assets/about/whySection/why3.png",
      title: "Goal",
      description:
        "Detailed explanations to foster deeper understanding of topics.",
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <section className="bg-white py-10 md:py-12 md:px-8">
      <div className="flex flex-col gap-8">
        <h2 className=" font-medium text-3xl md:text-4xl text-center md:text-left font-[Jost]">
          WHY QUIZU?
        </h2>

        <div className="flex justify-center">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center">
            {/* Map over cardData to render cards dynamically */}
            {cardData.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg rounded-tr-3xl rounded-bl-3xl border border-gray-300 shadow-xl p-4 md:p-6 flex flex-col justify-between m-6"
              >
                <div className="flex flex-col items-start w-[225px] h-[18rem]">
                  {/* Icon */}
                  <div
                    className={`size-14 p-3.5 ${card.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={card.icon}
                      alt={`${card.title} Icon`}
                    />
                  </div>
                  {/* Title */}
                  <h3 className="mt-3 text-2xl font-semibold">{card.title}</h3>
                  {/* Description */}
                  <p className="mt-5 text-[#949494] text-base md:text-lg">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
