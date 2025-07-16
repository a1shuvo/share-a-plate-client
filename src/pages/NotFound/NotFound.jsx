import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center space-y-6">
        <FaSadTear className="text-6xl text-error mx-auto animate-bounce" />

        <h1 className="text-5xl font-bold text-primary">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 text-lg">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/" className="btn btn-primary btn-wide">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
