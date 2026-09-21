import { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

// Custom toasts
import { CustomSuccessToast } from "../customToasts/CustomSuccessToast";
import { CustomErrorToast } from "../customToasts/CustomErrorToast";

// Context
import { mainStore } from "../../context/MainContext";

const phoneRegex = /^(?:(?:\+?20)|0)?1[0125]\d{8}$/;
const changePhoneValidationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Please enter a valid Egyptian phone number"),
});

const ChangePhoneModel = ({ setIsChangingPhone }) => {
  const { BASE_URL, token, userData, saveUserData } = useContext(mainStore);

  const endPoint = "/api/users/";

  const changePhone = async (values, { setSubmitting }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}${endPoint}${userData.id}`,
        { phone: values.phone.trim() },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = {
        id: res.data?.id,
        username: res.data?.username,
        lastname: res.data?.lastname,
        email: res.data?.email,
        phone: res.data?.phone,
      };

      saveUserData(data);
      CustomSuccessToast("Phone updated successfully");
      setIsChangingPhone(false);
    } catch (error) {
      const message =
        error.response?.data?.error?.message || "Phone is already taken";
      CustomErrorToast(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={() => setIsChangingPhone(false)}
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
          onClick={() => setIsChangingPhone(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Change Phone</h3>

        <Formik
          initialValues={{ phone: userData?.phone || "" }}
          validationSchema={changePhoneValidationSchema}
          enableReinitialize
          onSubmit={changePhone}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  name="phone"
                  placeholder="Enter new Phone"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 ${
                    touched.phone && errors.phone
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPhone(false)}
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

export default ChangePhoneModel;
