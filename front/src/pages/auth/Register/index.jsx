import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

// Icons
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

// Validation
import { validation } from "./validation";

// Context
import { mainStore } from "../../../context/MainContext";

// Custom Toasts
import { CustomSuccessToast } from "../../../components/CustomToasts/CustomSuccessToast";
import { CustomErrorToast } from "../../../components/CustomToasts/CustomErrorToast";

const Register = () => {
  const { BASE_URL, cartEndPoint, wishListEndPoint, token } =
    useContext(mainStore);

  const endPoint = "/api/auth/local/register";
  const navigateTo = useNavigate();
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const createNewCart = async (userId, jwtToken) => {
    const res = await axios.post(
      `${BASE_URL}${cartEndPoint}`,
      {
        data: {
          items: [],
          user: userId,
        },
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
  };

  const createNewWishList = async (userId, jwtToken) => {
    const res = await axios.post(
      `${BASE_URL}${wishListEndPoint}`,
      {
        data: {
          items: [],
          user: userId,
        },
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
  };

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      // 1. Register User
      const res = await axios.post(`${BASE_URL}${endPoint}`, {
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      const { jwt, user } = res.data;

      await Promise.all([
        createNewCart(user.id, jwt),
        createNewWishList(user.id, jwt),
      ]);

      CustomSuccessToast("Account created successfully!");
      setTimeout(() => {
        navigateTo("/auth/login");
      }, 1200);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "An error occurred during registration";
      CustomErrorToast(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigateTo("/");
    }
  }, [token, navigateTo]);

  return (
    <div className="grow min-h-[75dvh] flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validation}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="w-full p-8 flex flex-col rounded-2xl bg-white shadow-xl border border-gray-100">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create Account
              </h1>

              {/* Username*/}
              <div className="flex flex-col gap-1">
                <Field
                  type="text"
                  name="username"
                  placeholder="First Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                />
                <div className="text-xs text-red-500 min-h-4 px-1">
                  <ErrorMessage name="username" />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1 mb-1">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                />
                <div className="text-xs text-red-500 min-h-4 px-1">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1 mb-2">
                <div className="relative flex items-center">
                  <Field
                    type={isHidden ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500 transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={toggleHidden}
                    className="absolute right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {isHidden ? (
                      <FaEye className="text-xl" />
                    ) : (
                      <FaRegEyeSlash className="text-xl" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-red-500 min-h-4 px-1">
                  <ErrorMessage name="password" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md active:scale-95 cursor-pointer mb-4"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>

              {/* Footer Switch */}
              <div className="flex justify-center items-center gap-2 text-sm text-gray-600 font-medium">
                <span>Already have an account?</span>
                <span>|</span>
                <Link
                  to="/auth/login"
                  className="text-green-600 hover:underline font-semibold"
                >
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
