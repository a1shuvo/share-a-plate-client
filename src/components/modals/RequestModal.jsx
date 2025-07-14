import { FaHandHoldingHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const RequestModal = ({ donation, user, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const pickupTime = form.pickupTime.value;
    const description = form.description.value;

    try {
      const res = await axiosSecure.post("/requests", {
        donationId: donation._id,
        pickupTime,
        description,
      });

      if (res.data.insertedId) {
        Swal.fire("Success", "Request submitted successfully!", "success");
        onClose();
        refetch();
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to request donation",
        "error"
      );
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-2xl mb-4 flex items-center gap-2 text-primary">
          <FaHandHoldingHeart /> Request Donation
        </h3>

        <form onSubmit={handleRequest} className="space-y-4">
          <div>
            <input
              value={donation.title}
              className="input input-bordered w-full"
              readOnly
              placeholder="Donation Title"
            />
          </div>

          <div>
            <input
              value={donation.restaurant.name}
              className="input input-bordered w-full"
              readOnly
              placeholder="Restaurant Name"
            />
          </div>

          <div>
            <input
              value={user?.displayName}
              className="input input-bordered w-full"
              readOnly
              placeholder="Charity Name"
            />
          </div>

          <div>
            <input
              value={user?.email}
              className="input input-bordered w-full"
              readOnly
              placeholder="Charity Email"
            />
          </div>

          <div>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Request Description"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <input
              type="text"
              name="pickupTime"
              className="input input-bordered w-full"
              placeholder="Preferred Pickup Time (e.g., 3PM - 5PM)"
              required
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default RequestModal;
