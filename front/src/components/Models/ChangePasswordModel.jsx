import { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

// Custom toasts
import { CustomSuccessToast } from "../customToasts/CustomSuccessToast";
import { CustomErrorToast } from "../customToasts/CustomErrorToast";

// Context
import { mainStore } from "../../context/MainContext";

const ChangePasswordModel = ({ setIsChangingPassword }) => {
  const { BASE_URL, token, saveUserData } = useContext(mainStore);

  const endPoint = "/api/auth/change-password";

  const changePassword = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}${endPoint}`,
        {
          currentPassword: values.currentPassword,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = {
        id: res.data?.id,
        username: res.data?.username,
        lastname: res.data?.lastname,
        email: res.data?.email,
        phone: res.data?.phone,
        address: res.data?.address
      };

      saveUserData(data);
      CustomSuccessToast("Password changed successfully");
      setIsChangingPassword(false);
    } catch (error) {
      const message =
        error.response?.data?.error?.message || "Error while changing password";
      CustomErrorToast(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Regex rules
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const changePasswordValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string()
      .required("New password is required")
      .matches(
        passwordRules,
        "Password must contain:\n• At least 8 characters\n• One uppercase letter\n• One lowercase letter\n• One number\n• One special character (@$!%*?&)",
      )
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from current password",
      ),
    passwordConfirmation: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div
      onClick={() => setIsChangingPassword(false)}
      className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-fade-in"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsChangingPassword(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Change Password
        </h3>

        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={changePasswordValidationSchema}
          onSubmit={changePassword}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col gap-3">
              {/* Current Password */}
              <div>
                <Field
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 ${
                    touched.currentPassword && errors.currentPassword
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                <ErrorMessage
                  name="currentPassword"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* New Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 ${
                    touched.password && errors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                {/* whitespace-pre-line preserves the \n line breaks */}
                <ErrorMessage
                  name="password"
                  component="p"
                  className="whitespace-pre-line text-xs text-red-500 mt-1 leading-relaxed"
                />
              </div>

              {/* Password Confirmation */}
              <div>
                <Field
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm New Password"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 ${
                    touched.passwordConfirmation && errors.passwordConfirmation
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                <ErrorMessage
                  name="passwordConfirmation"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg text-gray-600 font-semibold bg-gray-100 hover:bg-gray-200 transition cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Changing..." : "Change"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordModel;
