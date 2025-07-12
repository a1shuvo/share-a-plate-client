import { useAuth } from "../../../hooks/useAuth";

const CharityProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary">Charity Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Charity Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {user?.displayName}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Role:</span>{" "}
            <span className="badge badge-success">Charity</span>
          </p>
          {/* Optional fields (customize if available in your user model) */}
          {/* 
          <p>
            <span className="font-semibold text-gray-700">Mission:</span> 
            Feeding the hungry across Bangladesh.
          </p>
          <p>
            <span className="font-semibold text-gray-700">Contact:</span> 
            +880-1XXXXXXXXX
          </p> 
          */}
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
