import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const AddDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Upload image to imgbb (optional)
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imageRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imageData = await imageRes.json();
      if (!imageData.success) throw new Error("Image upload failed");

      const imageUrl = imageData.data.url;

      // Build donation object
      const donation = {
        title: data.title,
        foodType: data.foodType,
        quantity: data.quantity,
        pickupTime: data.pickupTime,
        location: data.location,
        restaurantName: user?.displayName,
        restaurantEmail: user?.email,
        image: imageUrl,
        status: "Pending",
        createdAt: new Date(),
      };

      // Save to database
      const res = await axiosSecure.post("/donations", donation);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation Added",
          text: "Your donation is pending admin verification.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Add Food Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Donation Title */}
        <div>
          <label className="label">Donation Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g., Surplus Pastries"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Food Type */}
        <div>
          <label className="label">Food Type</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g., bakery, produce"
            {...register("foodType", { required: "Food type is required" })}
          />
          {errors.foodType && (
            <p className="text-red-500 text-sm">{errors.foodType.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="label">Quantity</label>
          <input
            type="text"
            placeholder="e.g., kg or portions"
            className="input input-bordered w-full"
            {...register("quantity", { required: "Quantity is required" })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        {/* Pickup Time */}
        <div>
          <label className="label">Pickup Time Window</label>
          <input
            type="text"
            placeholder="e.g., 3PM - 5PM"
            className="input input-bordered w-full"
            {...register("pickupTime", {
              required: "Pickup time is required",
            })}
          />
          {errors.pickupTime && (
            <p className="text-red-500 text-sm">{errors.pickupTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            placeholder="e.g., Gulshan, Dhaka"
            className="input input-bordered w-full"
            {...register("location", {
              required: "Location is required",
            })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image", {
              required: "Image is required",
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Restaurant Info (readonly) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Restaurant Name</label>
            <input
              className="input input-bordered w-full"
              value={user?.displayName}
              readOnly
            />
          </div>
          <div>
            <label className="label">Restaurant Email</label>
            <input
              className="input input-bordered w-full"
              value={user?.email}
              readOnly
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Donation"}
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
