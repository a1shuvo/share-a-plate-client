import {
  FaChartLine,
  FaCogs,
  FaHandsHelping,
  FaTruck,
  FaUtensils,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUtensils className="text-4xl text-primary" />,
      title: "1. Add a Donation",
      text: "Restaurants or individuals list surplus food with details like type, quantity, and pickup time.",
    },
    {
      icon: <FaHandsHelping className="text-4xl text-secondary" />,
      title: "2. Request & Match",
      text: "Charities and communities request donations, and our system matches them based on location and availability.",
    },
    {
      icon: <FaTruck className="text-4xl text-primary" />,
      title: "3. Pickup & Delivery",
      text: "Volunteers or assigned riders coordinate pickups and ensure safe delivery to charities.",
    },
    {
      icon: <FaChartLine className="text-4xl text-secondary" />,
      title: "4. Track the Impact",
      text: "Everyone can track the impact — meals served, food saved, and lives supported in real-time.",
    },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-12 py-16 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 text-center">
          <FaCogs className="text-4xl sm:text-3xl text-secondary" />
          <span className="text-3xl sm:text-4xl font-extrabold text-primary">
            How It Works
          </span>
        </h2>

        <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">
          A simple process designed to reduce food waste and connect surplus
          food with people who need it the most.
        </p>

        {/* Steps */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="card bg-base-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary/40"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 bg-base-200 rounded-full">{step.icon}</div>
                <h3 className="card-title text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm opacity-80">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
