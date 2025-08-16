import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../../components/shared/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: favorites = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/mine`);
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    // Show confirmation alert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this item from favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/favorites/${id}`);
        refetch(); // refresh data

        Swal.fire({
          title: "Removed!",
          text: "The item has been removed from your favorites.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Failed to remove the item.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        My Favorites
      </h2>

      {isLoading ? (
        <Loader></Loader>
      ) : favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          You don't have any favorites donations yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <div key={item._id} className="card bg-base-100 p-4 shadow rounded">
              <img
                src={item.image}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{item.title}</h3>
              <p className="text-sm">
                {item.restaurantName} - {item.location}
              </p>
              <p className="text-sm">
                Status: {item.status} | Qty: {item.quantity}
              </p>
              <div className="mt-2 flex justify-between">
                <Link
                  to={`/donation/${item._id}`}
                  className="btn btn-sm btn-primary"
                >
                  <FaEye /> Details
                </Link>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-sm btn-primary"
                >
                  <FaTrashAlt className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
