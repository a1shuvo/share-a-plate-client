import { useAuth } from "../../../hooks/useAuth";
import { useUserRole } from "../../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <div className="flex items-center gap-4 mb-4">
        <img src={user?.photoURL} className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      {role !== "user" && (
        <p className="text-sm mb-2">
          <strong>Role:</strong> {role}
        </p>
      )}
      <p className="text-sm">
        <strong>Joined:</strong>{" "}
        {new Date(user?.metadata?.creationTime).toLocaleDateString()}
      </p>
    </div>
  );
};

export default MyProfile;
