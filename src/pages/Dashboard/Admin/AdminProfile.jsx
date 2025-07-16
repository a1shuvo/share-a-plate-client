import { useAuth } from "../../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Admin Profile
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Admin Avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />

        {/* Info Section */}
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold">
            <span className="text-gray-600">Name: </span>
            {user?.displayName}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-gray-600">Email: </span>
            {user?.email}
          </p>
          <p className="text-lg font-semibold">
            <span className="text-gray-600">Role: </span>
            <span className="text-green-600">Admin</span>
          </p>
        </div>
      </div>

      {/* Optional: Footer or last login, if available */}
      {/* <p className="text-sm text-gray-400 text-center mt-4">Last login: 12 July 2025, 10:23 AM</p> */}
    </div>
  );
};

export default AdminProfile;
