import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaHandHoldingHeart,
  FaTrash,
  FaUserShield,
  FaUtensils,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../components/shared/Loader";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Success", "User role updated", "success");
    },
  });

  // ✅ Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Deleted", "User has been removed", "success");
    },
  });

  const handleRoleChange = (id, role) => {
    Swal.fire({
      title: `Assign ${role} role?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ id, role });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <table className="table w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role}</td>
              <td className="flex flex-wrap gap-2 justify-center items-center">
                {/* Role buttons */}
                <button
                  onClick={() => handleRoleChange(user._id, "admin")}
                  className="btn btn-xs btn-info"
                  disabled={user.role === "admin"}
                >
                  <FaUserShield className="mr-1" /> Admin
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "restaurant")}
                  className="btn btn-xs btn-warning"
                  disabled={user.role === "restaurant"}
                >
                  <FaUtensils className="mr-1" /> Restaurant
                </button>
                <button
                  onClick={() => handleRoleChange(user._id, "charity")}
                  className="btn btn-xs btn-success"
                  disabled={user.role === "charity"}
                >
                  <FaHandHoldingHeart className="mr-1" /> Charity
                </button>
                {/* Delete */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-xs btn-error"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
