import { FaQuoteLeft, FaQuoteRight, FaUsers } from "react-icons/fa";

const stories = [
  {
    id: 1,
    name: "Hope Foundation",
    role: "Charity",
    quote:
      "Thanks to ShareAPlate, we've been able to serve over 2,000 people in just one month. This platform changed the way we access food support.",
    image: "https://i.ibb.co/mrhypY2z/charity-4.png",
  },
  {
    id: 2,
    name: "Urban Bites",
    role: "Restaurant",
    quote:
      "We used to throw away so much extra food. Now, every surplus meal helps a real person. ShareAPlate made giving back effortless.",
    image: "https://i.ibb.co/5WkdjqCg/restaurant-logo.png",
  },
  {
    id: 3,
    name: "Feed the Future",
    role: "Charity",
    quote:
      "This platform is a lifeline. We've reached rural families with fresh meals they wouldn't have otherwise received.",
    image: "https://i.ibb.co/0yqyRnDB/charity-5.png",
  },
];

const CommunityStories = () => {
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-primary flex items-center justify-center gap-2">
          <FaUsers className="inline mr-2 text-secondary" />
          Community Stories
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mt-2">
          Real stories from real people making real impact.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-base-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={story.image}
                alt={story.name}
                className="w-16 h-16 rounded-full object-cover ring ring-primary ring-offset-2"
              />
              <div>
                <h3 className="text-lg font-semibold">{story.name}</h3>
                <p className="text-sm text-gray-500">{story.role}</p>
              </div>
            </div>

            <div className="text-sm italic relative mt-2 flex-grow">
              <FaQuoteLeft className="absolute text-gray-300 -top-4 -left-3 text-2xl" />
              <p className="leading-relaxed px-2">{story.quote}</p>
              <FaQuoteRight className="absolute text-gray-300 -bottom-4 -right-3 text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityStories;
