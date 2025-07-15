import axios from "axios";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import Loader from "../shared/Loader";

const LatestDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/requests/latest`
        );
        setRequests(res.data);
      } catch (err) {
        setError(err.message || "Unable to load latest requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          <FaHandsHelping className="inline mr-2 text-secondary" />
          Latest Charity Requests
        </h2>

        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white shadow-sm hover:shadow-lg transition duration-300 rounded-lg overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={req.charityImage || "/default-avatar.png"}
                      alt={req.charityName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {req.charityName}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <BsClock />{" "}
                        {new Date(req.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-primary mb-2">
                    {req.donationTitle}
                  </h4>

                  <p className="text-sm text-gray-600 flex gap-2">
                    <MdOutlineDescription className="text-lg text-accent" />
                    <span className="line-clamp-3">
                      {req.requestDescription}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestDonationRequests;
