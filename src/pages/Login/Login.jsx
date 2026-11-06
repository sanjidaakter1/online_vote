import React, { useState } from "react";
import { useForm } from "react-hook-form";
import imageIllus from "../../assets/image illus.png";
import Logo from "../../components/Logo/Logo";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Send data to backend API here
  };
  return (
    <div className="bg-green-300 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* ===== Left Side (Form) ===== */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            Welcome Back! Please login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter valid email",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />

              {/* Eye Button */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-6 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <p className="text-right mt-2">
                <a
                  href="/forgot-password"
                  className="text-primary text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
            <button className="btn w-full py-6 rounded-lg bg-violet-500 text-white border-[#e5e5e5] hover:bg-secondary ">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </form>
          <p className="text-gray-500 text-xs sm:text-sm mt-4 text-center">
            Are you new to our website ?{" "}
            <a
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </a>
            <p>Please</p>
          </p>
        </div>

        {/* ===== Right Side (Image) ===== */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img
            src={imageIllus}
            alt="Chat Illustration"
            className="max-h-100 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
