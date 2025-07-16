import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);

      await axiosSecure.put("/users/upsert", {
        email: data.email,
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      let message = "Login Failed";

      // Fallback parsing for Firebase 10+ auth errors
      if (err.code === "auth/invalid-credential") {
        message = "Email or password doesn't match.";
        setError("email", {
          type: "manual",
          message: "Email may be incorrect or not registered.",
        });
        setError("password", {
          type: "manual",
          message: "Password may be incorrect.",
        });
      } else if (err.code === "auth/user-not-found") {
        message = "Email doesn't match any account.";
        setError("email", {
          type: "manual",
          message: message,
        });
      } else if (err.code === "auth/wrong-password") {
        message = "Password doesn't match.";
        setError("password", {
          type: "manual",
          message: message,
        });
      } else {
        message = err.message;
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        timer: 2000,
        showConfirmButton: false,
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
        title: "Google Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
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
          Login to ShareAPlate
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full flex items-center gap-2 justify-center"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
