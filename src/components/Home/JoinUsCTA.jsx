import { FaHandsHelping, FaHeart, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router";

const JoinUsCTA = () => {
  return (
    <section className="relative overflow-hidden px-4 md:px-8 lg:px-12 py-24 bg-gradient-to-br from-base-200 via-base-100 to-base-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Subtle background circles */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 via-secondary/20 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-secondary/20 via-primary/20 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Heading with icon animation */}
        <h2 className="text-4xl font-extrabold text-primary flex items-center justify-center gap-3 mb-6">
          <FaHeart className="text-secondary animate-pulse" />
          Join Us
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
          Together we can fight food waste and support communities in need. Join
          as a user to explore, or upgrade to a charity to make a lasting
          difference.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/register"
            className="btn btn-primary btn-lg rounded-full px-10 py-4 shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
          >
            <FaUserPlus className="text-lg" />
            Register
          </Link>
          <Link
            to="/dashboard/upgrade-role"
            className="btn btn-secondary btn-lg rounded-full px-10 py-4 shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
          >
            <FaHandsHelping className="text-lg" />
            Become a Charity
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinUsCTA;
