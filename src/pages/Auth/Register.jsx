import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile, loginWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name, photo } = data;

    try {
      await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });

      await axiosSecure.put("/users/upsert", {
        name,
        email,
        image: photo,
        isGoogleUser: false,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      await axiosSecure.put("/users/upsert", {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        isGoogleUser: true,
      });

      Swal.fire({
        icon: "success",
        title: "Registered with Google",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Register Failed",
        text: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Register on ShareAPlate
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            type="url"
            placeholder="Photo URL"
            {...register("photo")}
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full flex items-center gap-2 justify-center"
        >
          <FcGoogle className="text-xl" /> Register with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
