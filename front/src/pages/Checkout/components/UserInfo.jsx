import { Field, ErrorMessage, useFormikContext } from "formik";

const UserInfo = () => {
  const { errors, touched } = useFormikContext();

  const getFieldClass = (fieldName) =>
    `px-3 py-2.5 rounded-md border outline-none transition-all placeholder:text-gray-400 bg-white ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 focus:ring-1 focus:ring-red-400"
        : "border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
    }`;

  return (
    <div className="w-full md:w-8/12 py-4 rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Billing Information
      </h2>

      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="firstName"
              className="text-sm text-gray-700 font-medium"
            >
              First name
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name"
              className={getFieldClass("firstName")}
            />
            <ErrorMessage
              name="firstName"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lastName"
              className="text-sm text-gray-700 font-medium"
            >
              Last name
            </label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              className={getFieldClass("lastName")}
            />
            <ErrorMessage
              name="lastName"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="companyName"
              className="text-sm text-gray-700 font-medium"
            >
              Company Name{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <Field
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company name"
              className={getFieldClass("companyName")}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="streetAddress"
            className="text-sm text-gray-700 font-medium"
          >
            Street Address
          </label>
          <Field
            type="text"
            id="streetAddress"
            name="streetAddress"
            placeholder="Street Address"
            className={getFieldClass("streetAddress")}
          />
          <ErrorMessage
            name="streetAddress"
            component="p"
            className="text-xs text-red-500"
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="country"
              className="text-sm text-gray-700 font-medium"
            >
              Country / Region
            </label>
            <Field
              as="select"
              id="country"
              name="country"
              className={getFieldClass("country")}
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="eg">Egypt</option>
            </Field>
            <ErrorMessage
              name="country"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="state"
              className="text-sm text-gray-700 font-medium"
            >
              State / Region
            </label>
            <Field
              as="select"
              id="state"
              name="state"
              className={getFieldClass("state")}
            >
              <option value="" disabled>
                Select State
              </option>
              <option value="cairo">Cairo</option>
            </Field>
            <ErrorMessage
              name="state"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="zipCode"
              className="text-sm text-gray-700 font-medium"
            >
              Zip Code
            </label>
            <Field
              type="text"
              id="zipCode"
              name="zipCode"
              placeholder="Zip Code"
              className={getFieldClass("zipCode")}
            />
            <ErrorMessage
              name="zipCode"
              component="p"
              className="text-xs text-red-500"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm text-gray-700 font-medium"
            >
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className={getFieldClass("email")}
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-sm text-gray-700 font-medium"
            >
              Phone
            </label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone number"
              className={getFieldClass("phone")}
            />
            <ErrorMessage
              name="phone"
              component="p"
              className="text-xs text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
