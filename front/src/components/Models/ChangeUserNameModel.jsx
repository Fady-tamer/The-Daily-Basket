import { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

// Custom toasts
import { CustomSuccessToast } from "../customToasts/CustomSuccessToast";
import { CustomErrorToast } from "../customToasts/CustomErrorToast";

// Context
import { mainStore } from "../../context/MainContext";

const changeUserNameValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  lastname: Yup.string()
    .trim()
    .min(3, "LastName must be at least 3 characters")
    .required("LastName is required"),
});

const ChangeFirstNameModel = ({ setIsChangingUserName }) => {
  const { BASE_URL, token, userData, saveUserData } = useContext(mainStore);

  const endPoint = "/api/users/";

  const changeUserName = async (values, { setSubmitting }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}${endPoint}${userData.id}`,
        { username: values.username.trim(), lastname: values.lastname.trim() },
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
      CustomSuccessToast("Username updated successfully");
      setIsChangingUserName(false);
    } catch (error) {
      const message =
        error.response?.data?.error?.message || "Username is already taken";
      CustomErrorToast(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={() => setIsChangingUserName(false)}
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
          onClick={() => setIsChangingUserName(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Change Username
        </h3>

        <Formik
          initialValues={{
            username: userData?.username || "",
            lastname: userData?.lastname || "",
          }}
          validationSchema={changeUserNameValidationSchema}
          enableReinitialize
          onSubmit={changeUserName}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  name="username"
                  placeholder="Enter new username"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 ${
                    touched.username && errors.username
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              <div>
                <Field
                  name="lastname"
                  placeholder="Enter new lastname"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 ${
                    touched.lastname && errors.lastname
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                <ErrorMessage
                  name="lastname"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingUserName(false)}
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

export default ChangeFirstNameModel;
