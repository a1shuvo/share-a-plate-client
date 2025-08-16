import CountUp from "react-countup";
import { FaChartBar, FaLeaf, FaRecycle, FaUtensils } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    id: 1,
    icon: <FaUtensils className="text-5xl text-primary" />,
    label: "Meals Donated",
    end: 124520,
    suffix: "+",
  },
  {
    id: 2,
    icon: <FaRecycle className="text-5xl text-primary" />,
    label: "Food Saved (kg)",
    end: 18740,
    suffix: "kg",
  },
  {
    id: 3,
    icon: <FaLeaf className="text-5xl text-primary" />,
    label: "CO₂ Reduced",
    end: 5960,
    suffix: "kg",
  },
];

const ImpactStats = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section ref={ref} className="py-16 px-4 bg-base-100">
      <h2 className="text-4xl font-extrabold text-primary flex items-center justify-center gap-2 mb-10">
        <FaChartBar className="inline mr-2 text-secondary" /> Our Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-base-200 p-8 rounded-2xl shadow-md text-center hover:shadow-lg transition-all duration-300 border border-base-200"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <div className="text-4xl font-bold">
              {inView ? (
                <CountUp
                  end={stat.end}
                  duration={2}
                  separator=","
                  suffix={` ${stat.suffix}`}
                />
              ) : (
                "0"
              )}
            </div>
            <p className="mt-2 text-gray-500 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
