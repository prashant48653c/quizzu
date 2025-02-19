import React from 'react';

// Define the type for each news item
interface NewsItem {
  image: string;
  title: string;
  date: string;
  description: string;
}

const News: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      image: '/assets/news/images/news1.png',
      title: 'Quiz Competition 2024 Announced!',
      date: 'Nov 24, 2024',
      description: 'Join the biggest quiz competition of the year and showcase your knowledge.',
    },
    {
      image: '/assets/news/images/news2.png',
      title: '10 Tips to Ace Any Quiz',
      date: 'Nov 23, 2024',
      description: 'Boost your quiz performance with these expert tips!',
    },
    {
      image: '/assets/news/images/news3.png',
      title: 'New Quiz Categories Added',
      date: 'Nov 22, 2024',
      description: 'Explore our new quiz categories to test your knowledge.',
    },
  ];

  return (
    <section className="bg-white">
      <div className="py-14 px-6 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-12 font-[Jost] text-left">
          Latest News
        </h2>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="w-full max-w-[379px] bg-white shadow-xl rounded-[12px] overflow-hidden mx-auto"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-3xl font-semibold mb-2 font-[Jost]">
                  {item.title}
                </h3>
                <p className="text-sm mb-4 text-[#C2C2C2] font-[Jost]">
                  {item.date}
                </p>
                <p className="text-[#949494] text-lg font-[Jost]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;