import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const RestaurantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: restaurant = {} } = useQuery({
    queryKey: ["restaurantProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Restaurant Profile
      </h2>

      <div className="flex items-center justify-center mb-6">
        <img
          src={restaurant?.image || user?.photoURL || "/default-avatar.png"}
          alt="Restaurant Logo"
          className="w-24 h-24 rounded-full shadow ring ring-primary ring-offset-base-100 ring-offset-2"
        />
      </div>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">Name:</span> {restaurant?.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {restaurant?.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span>{" "}
          <span className="badge badge-success badge-sm">Restaurant</span>
        </p>
        {restaurant?.address && (
          <p>
            <span className="font-semibold">Address:</span> {restaurant.address}
          </p>
        )}
        {restaurant?.contact && (
          <p>
            <span className="font-semibold">Contact:</span> {restaurant.contact}
          </p>
        )}
        {restaurant?.joinedAt && (
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(restaurant.joinedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default RestaurantProfile;
