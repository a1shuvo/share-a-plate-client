import { FaClock, FaHandsHelping, FaLeaf, FaUsers } from "react-icons/fa";

const benefits = [
  {
    icon: <FaHandsHelping className="text-4xl text-primary" />,
    title: "Support Communities",
    description:
      "Connect with charities and individuals to reduce food waste and help those in need.",
  },
  {
    icon: <FaLeaf className="text-4xl text-secondary" />,
    title: "Reduce Food Waste",
    description:
      "Make a positive environmental impact by ensuring leftover food reaches the right hands.",
  },
  {
    icon: <FaUsers className="text-4xl text-primary" />,
    title: "Join a Caring Network",
    description:
      "Be part of a community of restaurants, charities, and users working together for good.",
  },
  {
    icon: <FaClock className="text-4xl text-secondary" />,
    title: "Quick & Easy",
    description:
      "Donate or request food effortlessly with our user-friendly platform.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-16 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-primary">
            Why Choose <span className="text-secondary">ShareAPlate?</span>
          </span>
        </h2>

        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">
          We connect restaurants, charities, and users to fight food waste and
          create a positive impact on communities and the environment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-base-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col items-center text-center border-t-4 border-primary/40"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="card-title text-lg font-semibold">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm opacity-80">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
