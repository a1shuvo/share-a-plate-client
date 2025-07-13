import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const UpdateDonation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch existing donation data
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axiosSecure.get(`/donations/${id}`);
        const data = res.data;
        if (data) {
          setValue("title", data.title);
          setValue("foodType", data.foodType);
          setValue("quantity", data.quantity);
          setValue("pickupTime", data.pickupTime);
          setValue("location", data.location);
          setCurrentImage(data.image);
        }
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to fetch donation", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, axiosSecure, setValue]);

  // Preview new image if selected
  const imageWatch = watch("image");
  useEffect(() => {
    if (imageWatch && imageWatch.length > 0) {
      const file = imageWatch[0];
      const previewURL = URL.createObjectURL(file);
      setCurrentImage(previewURL);
    }
  }, [imageWatch]);

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let imageUrl = currentImage;

      // Upload new image if provided
      if (data.image && data.image.length > 0) {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await imageRes.json();
        if (!imageData.success) throw new Error("Image upload failed");

        imageUrl = imageData.data.url;
      }

      const updateData = {
        title: data.title,
        foodType: data.foodType,
        quantity: data.quantity,
        pickupTime: data.pickupTime,
        location: data.location,
        image: imageUrl,
      };

      const res = await axiosSecure.patch(`/donations/${id}`, updateData);

      if (res.data.modifiedCount >= 0) {
        Swal.fire({
          icon: "success",
          title: "Donation Updated",
          text: "Your donation has been successfully updated.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/dashboard/restaurant/my-donations");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading donation...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Update Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
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
            className="input input-bordered w-full"
            placeholder="e.g., 10kg"
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
            className="input input-bordered w-full"
            placeholder="e.g., 3PM - 5PM"
            {...register("pickupTime", { required: "Pickup time is required" })}
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
            className="input input-bordered w-full"
            placeholder="e.g., Gulshan, Dhaka"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image")}
          />
        </div>

        {/* Image Preview */}
        {currentImage && (
          <div className="mt-4">
            <p className="text-sm mb-1">Preview:</p>
            <img
              src={currentImage}
              alt="Current"
              className="w-32 h-32 rounded border object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Updating..." : "Update Donation"}
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
