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

const Login = () => {
  const {
    BASE_URL,
    END_POINT,
    token,
    saveToken,
    saveUserData,
    saveCartId,
    saveCartItems,
    saveWishListId,
    saveWishListItems,
  } = useContext(mainStore);

  const endPoint = "/api/auth/local";
  const navigateTo = useNavigate();
  const [isHidden, setIsHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const fetchCart = async (jwt) => {
    try {
      const res = await axios.get(`${BASE_URL}${END_POINT}?populate=cart`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const cartId = res.data?.cart?.documentId;
      const cartItem = res.data?.cart?.items;

      if (cartItem) {
        saveCartId(cartId);
        saveCartItems(cartItem);
      }
    } catch (err) {
      console.warn("Could not fetch user cart:", err);
    }
  };

  const fetchWishList = async (jwt) => {
    try {
      const res = await axios.get(`${BASE_URL}${END_POINT}?populate=wishlist`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const wishListId = res.data?.wishlist?.documentId;
      const wishListItem = res.data?.wishlist?.items;

      if (wishListItem) {
        saveWishListId(wishListId);
        saveWishListItems(wishListItem);
      }
    } catch (err) {
      console.warn("Could not fetch user wishlist:", err);
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`${BASE_URL}${endPoint}`, values);

      const userData = {
        id: res.data?.user?.id,
        username: res.data?.user?.username,
        lastname: res.data?.user?.lastname,
        email: res.data?.user?.email,
        phone: res.data?.user?.phone,
        address: res.data?.user?.address,
      };

      const jwt = res.data?.jwt;

      if (jwt) {
        saveToken(jwt);
        saveUserData(userData);

        await Promise.all([fetchCart(jwt), fetchWishList(jwt)]);
      }

      CustomSuccessToast("Login successful!");
      navigateTo("/", { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "Invalid email/username or password";
      CustomErrorToast(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigateTo("/", { replace: true });
    }
  }, [token, navigateTo]);

  return (
    <div className="grow min-h-[56dvh] flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{ identifier: "", password: "" }}
          validationSchema={validation}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="w-full p-8 flex flex-col rounded-2xl bg-white shadow-xl border border-gray-100">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Welcome Back
              </h1>

              {/* Identifier Field */}
              <div className="flex flex-col gap-1 mb-3">
                <Field
                  type="text"
                  name="identifier"
                  placeholder="Email or Username"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                />
                <div className="text-xs text-red-500 min-h-4 px-1">
                  <ErrorMessage name="identifier" />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1 mb-4">
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
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Footer Switch */}
              <div className="flex justify-center items-center gap-2 text-sm text-gray-600 font-medium">
                <span>Don't have an account?</span>
                <span>|</span>
                <Link
                  to="/auth/register"
                  className="text-green-600 hover:underline font-semibold"
                >
                  Register
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
