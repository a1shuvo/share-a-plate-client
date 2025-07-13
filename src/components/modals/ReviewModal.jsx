import Swal from "sweetalert2";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const ReviewModal = ({ donationId, user, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const rating = parseInt(form.rating.value);

    try {
      const res = await axiosSecure.post("/reviews", {
        donationId,
        name: user.displayName,
        email: user.email,
        description,
        rating,
      });

      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted", "success");
        onClose();
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to add review", "error");
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add Review</h3>
        <form onSubmit={handleReview} className="space-y-3">
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Review description"
            required
          ></textarea>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            className="input input-bordered w-full"
            placeholder="Rating (1-5)"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              Submit Review
            </button>
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ReviewModal;
